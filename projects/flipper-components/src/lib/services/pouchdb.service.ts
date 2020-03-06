import { Injectable, EventEmitter } from '@angular/core';
import PouchDB from 'pouchdb';
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
 

    public constructor() {}

    public connect(dbName:string){
        if(!this.isInstantiated && dbName) {
            this.database = new PouchDB(dbName);
            this.isInstantiated = true;
        }
    }
    public fetch() {
        return this.database.allDocs({include_docs: true});
    }

    public get(id: string) {
        return this.database.get(id);
    }

    public  find(id){

       return this.get(id).then(result => {
        return  result;
    }, error => {
        if(error.status == "404") {
             throw(`ERROR:${error}`);
        } else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    });

       

    }

    getResponse(result,isArray){
      
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

      uid(){
          return uuidv1();
      }
    

    public put(id: string, document: any) {
        document['_id'] = id;
        document.uid = this.uid();
        document.channel = PouchConfig.channel;
        return this.get(id).then(result => {
            document._rev = result._rev;
            return this.database.put(document);
        }, error => {
            if(error.status == "404" || error.status == 404) {
                return this.database.put(document);
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }

    public sync(remote: string) {
        let remoteDatabase = new PouchDB(remote);
        this.database.sync(remoteDatabase, {
            live: true,
            retry: true
        }).on('change', change => {
            if(change){
                this.listener.emit(change);
            } 
        })
        .on('paused', change => {
            if(change){
                this.listener.emit(change);
            }
        }).on('active', change => {
            if(change){
                this.listener.emit(change);
            }
        }).on('denied', change => {
            if(change){
                this.listener.emit(change);
            }
        }).on('complete', change => {
            if(change){
                this.listener.emit(change);
            }
        })
        .on('error', error => {
            console.error(JSON.stringify(error));
        });
    }

    public getChangeListener() {
        return this.listener;
    }
    public getChangeListenerLogin() {
        return this.listenerLogin;
    }



    unique(a:Array<any>,key:string="name"):Array<any> {
        return a.length > 0?this.removeDuplicates(a,key):[];
    }
    
     contains(array:Array<any>, obj:any,key:string):boolean {
      for (var i = 0; i < array.length; i++) {
          if (this.isEqual(array[i], obj,key)) return true;
      }
      return false;
    }
    //comparator
     isEqual(obj1:any, obj2:any,key:string) {
      if ((obj1[key] == obj2[key])) return true;
      return false;
    }
     removeDuplicates(ary:Array<any>,key:string) {
      var arr = [];
      return ary.filter((x:any)=> {
          return !this.contains(arr, x,key) && arr.push(x);
      });
    }

}
