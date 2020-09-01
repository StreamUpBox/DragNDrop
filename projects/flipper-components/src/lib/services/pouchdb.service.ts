import { Injectable, EventEmitter } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);

import debugPouch from "pouchdb-debug";


import { v1 as uuidv1 } from 'uuid';
import { PouchConfig } from '../db-config';



@Injectable({
    providedIn: 'root'
})

export class PouchDBService {

    private isInstantiated: boolean;
    private database: any;
    public listener: EventEmitter<any> = new EventEmitter();
    public listenerLogin: EventEmitter<any> = new EventEmitter();



    public constructor() { 
        console.log('debugging the pouchdb');
        debugPouch(PouchDB);
    }

    public activeUser(table = 'users') {
        return this.database.createIndex({
            index: { fields: ['table', 'active'] }
        }).then(result => {
            return this.database.find({
                selector: {
                    table: { $eq: table },
                    active: { $eq: true },
                }
            });
        })
    }

    public query(fields = [], selector = {}) {

        return this.database.createIndex({
            index: { fields: fields }
        }).then(result => {
            return this.database.find({
                
                selector: selector
            });
        })

        
    }


    public activeBusiness(userId, table = 'businesses') {
        // comment
        return this.database.createIndex({
            index: { fields: ['table', 'active', 'userId'] }
        }).then(result => {
            return this.database.find({
                selector: {
                    table: { $eq: table },
                    active: { $eq: true },
                    userId: { $eq: userId }
                }
            });
        })
    }

    public hasDraftProduct(businessId, table = 'products') {
        // comment
        return this.database.createIndex({
            index: { fields: ['table', 'isDraft', 'businessId'] }
        }).then(result => {
            return this.database.find({
                selector: {
                    table: { $eq: table },
                    isDraft: { $eq: true },
                    businessId: { $eq: businessId }
                }
            });
        })
    }
    public currentBusiness() {

        return this.activeUser().then(user => {

            if (user && user.docs.length > 0) {
                return this.activeBusiness(user.docs[0].id, 'businesses').then(business => {

                    if (business && business.docs.length > 0) {
                        return business.docs[0];
                    }
                })
            }
        });
    }

    public currentTax() {
        return this.activeUser().then(user => {

            if (user && user.docs.length > 0) {
                return this.activeBusiness(user.docs[0].id, 'businesses').then(business => {
                    if (business && business.docs.length > 0) {

                        return this.database.query(['table', 'businessId', "isDefault"], {
                            table: { $eq: 'taxes' }, businessId: { $eq: business.docs[0].id }, isDefault: { $eq: true }
                        }).then(res => {

                            if (res.docs && res.docs.length > 0) {
                                return res.docs[0];
                            } else {
                                return [];
                            }

                        });
                    } else {
                        return null;
                    }
                })
            }
        });
    }

    public listBusinessBranches() {

        return this.currentBusiness().then(business => {

            if (business) {

                return this.query(['table', 'businessId'], {
                    table: { $eq: 'branches' },
                    businessId: { $eq: business.id }
                }).then(res => {
                    if (res.docs && res.docs.length > 0) {
                        return res.docs;
                    } else {
                        return [];
                    }
                });
            } else {
                return [];
            }
        });

    }

    public listBusinessTaxes() {

                return this.currentBusiness().then(business => {
                    if (business) {

                       return this.query(['table', 'businessId'], {
                            table: { $eq: 'taxes' },
                            businessId: { $eq: business.id }
                        }).then(res => {

                            if (res.docs && res.docs.length > 0) {
                                return res.docs;
                            } else {
                                return [];
                            }
                        });

                    } else {
                        return [];
                    }
                });
          
    }

    public activeBranch(businessId, table = "branches") {
        return this.database.createIndex({
            index: { fields: ['tables', 'active', 'businessId'] }
        }).then(result => {
            return this.database.find({
                selector: {
                    table: { $eq: table },
                    active: { $eq: true },
                    businessId: { $eq: businessId }
                }
            });
        })
    }

    public connect(dbName: string, filter: string = null) {
        if (!this.isInstantiated && dbName) {
            this.database = new PouchDB(dbName);
            if (filter != null) {
                this.database.changes({
                    filter: function (doc) {
                        //make sure we filter only to listen on our document of intrest.
                        return doc.channel === filter;
                    }
                });
            }
            this.isInstantiated = true;
        }
    }

    public fetch() {
        return this.database.allDocs({ include_docs: true });
    }

    public get(id: string) {
        // enable allowing conflicting document.
        return this.database.get(id, { conflicts: false });
        // return  this.database.createIndex({
        //     index: {fields: ['id']}
        //   }).then(result => {
        //       return this.database.find({
        //         selector: {
        //           id: {$eq:id}
        //         }
        //       });
        //   })
    }

    public remove(document: any) {
        try{
        return this.database.remove(document);
        }catch(e){
            console.log('did not removed',e);
        }
    }

    public find(id) {

        return this.get(id).then(result => {
            return result;
        }, error => {
            if (error.status === '404') {
                throw new Error((`ERROR:${error}`));
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });


    }

    getResponse(result, isArray) {

        if (!Array.isArray(result) && isArray) {
            return [result];
        }
        if (Array.isArray(result) && !isArray) {
            return result[0];
        }
        return result;

    }

    makeid(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    uid() {
        return uuidv1();
    }



    public put(id: string, document: any) {
        document._id = id;
        document.uid = this.uid();
        document.channel = PouchConfig.channel;
        document.channels = [PouchConfig.channel];


        return this.get(id).then(result => {
            console.log('result',result);
            document._rev = result._rev;
            console.log('updated doc',document);
            return this.database.put(document);
        }, error => {
            console.log('error on update',error);
            if (error.status === '404' || error.status === 404) {
                return this.database.put(document);
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }


    public sync(remote: string) {
        const sessionId = PouchConfig.sessionId;
        document.cookie = sessionId;
        //our main = bucket and is constant to all users.
        PouchDB.sync('main', remote, {
            live: false,
            retry: true
        }).on('change', change => {
            if (change) {
                this.listener.emit(change);
            }
        }).on('paused', change => {
            console.log("sync paused");
            if (change) {
                this.listener.emit(change);
            }
        }).on('active', () => {
        }).on('denied', change => {
            console.log("sync denied");
            if (change) {
                this.listener.emit(change);
            }
        }).on('complete', change => {
            console.log("sync complete");
            if (change) {
                this.listener.emit(change);
            }
        }).on('error', error => {
            console.log("sync error");
            console.error(JSON.stringify(error));
        });
    }
    public getChangeListener() {
        return this.listener;
    }
    public getChangeListenerLogin() {
        return this.listenerLogin;
    }
    unique(a: Array<any>, key: string = 'name'): Array<any> {
        return a.length > 0 ? this.removeDuplicates(a, key) : [];
    }
    contains(array: Array<any>, obj: any, key: string): boolean {

        for (const newObj of array) {
            if (this.isEqual(newObj, obj, key)) { return true; }
        }
        return false;
    }
    // comparator
    isEqual(obj1: any, obj2: any, key: string) {
        if ((obj1[key] === obj2[key])) { return true; }
        return false;
    }
    removeDuplicates(ary: Array<any>, key: string) {
        const arr = [];
        return ary.filter((x: any) => {
            return !this.contains(arr, x, key) && arr.push(x);
        });
    }

}
