import { Injectable, EventEmitter } from '@angular/core'
import PouchDB from 'pouchdb/dist/pouchdb'
import debugPouch from 'pouchdb-debug'

import { v1 as uuidv1 } from 'uuid'
import { FlipperEventBusService } from '@enexus/flipper-event'
import { flipperUrl } from '../constants'
import { Business } from '../entries/business'
import { HttpClient } from '@angular/common/http'
import { Branch } from '../entries/branch'

class Response {
  res: any
  docs: any
}

interface Handler {
  (result: Response): void
}

@Injectable({
  providedIn: 'root',
})
export class PouchDBService {
  private isInstantiated: boolean = false
  private database: any
  public listener: EventEmitter<any> = new EventEmitter()
  public listenerLogin: EventEmitter<any> = new EventEmitter()

  public constructor(private http: HttpClient, private eventBus: FlipperEventBusService) {
    // PouchDB.plugin(PouchFind);
    PouchDB.plugin(require('pouchdb-find').default)
    this.connect('main')
    debugPouch(PouchDB)
    this.sync([localStorage.getItem('userId')]) //we keep the current logged userId in local storage for quick access
  }

  public activeUser(table = 'users') {
    return this.database
      .createIndex({
        index: { fields: ['table', 'active'] },
      })
      .then(() => {
        return this.database.find({
          selector: {
            table: { $eq: table },
            active: { $eq: true },
          },
        })
      })
  }

  public query(fields = [], selector = {}) {
    return this.database
      .createIndex({
        index: { fields: fields },
      })
      .then(() => {
        return this.database.find({
          selector: selector,
        })
      })
  }
  public async fastQuery(fields = [], selector = {}) {
    try {
      // Create the Index
      var result = await this.database.createIndex({
        index: { fields: fields },
      })

      // Query the Index using find().
      result = await this.database.find({
        selector: selector,
      })

      // Found docs are in result.docs
      return await result.docs
    } catch (err) {
      console.log(err)
    }
  }

  public callbackQuery(fields = [], selector = {}, callback: Handler) {
    return this.database.find(
      {
        selector: selector,
        fields: fields,
      },
      function (err: any, result: Response) {
        if (err) {
          return console.log(err)
        }
        // handle result
        return callback(result)
      }
    )
  }

  public activeBusiness(userId: any, table = 'businesses') {
    // comment
    return this.database
      .createIndex({
        index: { fields: ['table', 'active', 'userId'] },
      })
      .then(() => {
        return this.database.find({
          selector: {
            table: { $eq: table },
            active: { $eq: true },
            userId: { $eq: userId },
          },
        })
      })
  }

  public hasDraftProduct(businessId: any, table = 'products') {
    // comment
    return this.database
      .createIndex({
        index: { fields: ['table', 'isDraft', 'businessId'] },
      })
      .then(() => {
        return this.database.find({
          selector: {
            table: { $eq: table },
            isDraft: { $eq: true },
            businessId: { $eq: businessId },
          },
        })
      })
  }
  public currentBusiness() {
    return this.activeUser().then((user: { docs: string | any[] }) => {
      if (user && user.docs.length > 0) {
        return this.activeBusiness(user.docs[0].id, 'businesses').then((business: { docs: string | any[] }) => {
          if (business && business.docs.length > 0) {
            return business.docs[0]
          }
        })
      }
    })
  }

  public currentTax() {
    // TODO: migrate this
    return this.activeUser().then((user: { docs: string | any[] }) => {
      if (user && user.docs.length > 0) {
        return this.activeBusiness(user.docs[0].id, 'businesses').then((business: { docs: string | any[] }) => {
          if (business && business.docs.length > 0) {
            return this.database
              .query(['table', 'businessId', 'isDefault'], {
                table: { $eq: 'taxes' },
                businessId: { $eq: business.docs[0].id },
                isDefault: { $eq: true },
              })
              .then((res: { docs: string | any[] }) => {
                if (res.docs && res.docs.length > 0) {
                  return res.docs[0]
                } else {
                  return []
                }
              })
          } else {
            return null
          }
        })
      }
    })
  }

  public async listBusinessBranches() {
    // I put any on the first promise as my intention is to return a list of branches not businesses
    return await this.http
      .get<any>(flipperUrl + '/api/business')
      .toPromise()
      .then(async business => {
        if (business) {
          return await this.http
            .get<[Branch]>(flipperUrl + '/api/branches/' + business.id)
            .toPromise()
            .then(branches => {
              return branches
            })
        }
      })
    // return this.currentBusiness().then((business: { id: any }) => {
    //   if (business) {
    //     return this.query(['table', 'businessId'], {
    //       table: { $eq: 'branches' },
    //       businessId: { $eq: business.id },
    //     }).then((res: { docs: string | any[] }) => {
    //       if (res.docs && res.docs.length > 0) {
    //         return res.docs
    //       } else {
    //         return []
    //       }
    //     })
    //   } else {
    //     return []
    //   }
    // })
  }

  public listBusinessTaxes() {
    return this.currentBusiness().then((business: { id: any }) => {
      if (business) {
        return this.query(['table', 'businessId'], {
          table: { $eq: 'taxes' },
          businessId: { $eq: business.id },
        }).then((res: { docs: string | any[] }) => {
          if (res.docs && res.docs.length > 0) {
            return res.docs
          } else {
            return []
          }
        })
      } else {
        return []
      }
    })
  }

  public listBusinessTaxes2() {
    return this.currentBusiness().then((business: { id: any }) => {
      if (business) {
        return this.callbackQuery(
          ['table', 'businessId'],
          {
            table: { $eq: 'taxes' },
            businessId: { $eq: business.id },
          },
          res => {
            if (res.docs && res.docs.length > 0) {
              return res.docs
            } else {
              return []
            }
          }
        )
      } else {
        return []
      }
    })
  }
  public activeBranch(businessId: string, table = 'branches') {
    return this.database
      .createIndex({
        index: { fields: ['tables', 'active', 'businessId'] },
      })
      .then(() => {
        return this.database.find({
          selector: {
            table: { $eq: table },
            active: { $eq: true },
            businessId: { $eq: businessId },
          },
        })
      })
  }

  public connect(dbName: string, filter: string = null) {
    if (!this.isInstantiated) {
      this.database = new PouchDB('main')
      console.log('did couchbase connected?')
      if (filter != null) {
        this.database.changes({
          filter: (doc: any) => {
            //make sure we filter only to listen on our document of intrest.
            // TODO: see if we need this as not filter can be part of the sync function
            return doc.channels[0] === filter
          },
        })
      }
      this.isInstantiated = true
    }
  }

  public fetch() {
    return this.database.allDocs({ include_docs: true })
  }

  public get(id: string) {
    // enable allowing conflicting document.
    return this.database.get(id, { conflicts: false })
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
    try {
      return this.database.remove(document)
    } catch (e) {
      console.log('did not removed', e)
    }
  }

  public find(id: string) {
    return this.get(id).then(
      (result: any) => {
        return result
      },
      (error: { status: string }) => {
        if (error.status === '404') {
          throw new Error(`ERROR:${error}`)
        } else {
          return new Promise((_resolve, reject) => {
            reject(error)
          })
        }
      }
    )
  }

  getResponse(result: any[], isArray: any) {
    if (!Array.isArray(result) && isArray) {
      return [result]
    }
    if (Array.isArray(result) && !isArray) {
      return result[0]
    }
    return result
  }

  makeid(length: number) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  uid() {
    return uuidv1()
  }

  public put(id: string, document: any) {
    document._id = id
    document.uid = this.uid()
    document.channel = localStorage.getItem('userId')
    document.channels = [localStorage.getItem('userId')]

    return this.get(id).then(
      (result: { _rev: any }) => {
        document._rev = result._rev
        console.log('updated doc', document)
        return this.database.put(document)
      },
      (error: { status: string | number }) => {
        console.log('error on update', error)
        if (error.status === '404' || error.status === 404) {
          return this.database.put(document)
        } else {
          return new Promise((_resolve, reject) => {
            reject(error)
          })
        }
      }
    )
  }
  public sync(channels: Array<string>) {
    //NOTE: our main = bucket and is constant to all users. //do not use sessionId on pouchDB we don't use it on backend i.e on the server
    // return PouchDB.sync('main', 'url', {
    //   password: 'singlworld',
    //   user: 'admin',
    //   push: true,
    //   live: true,
    //   retry: true,
    //   continous: true,
    //   filter: "sync_gateway/bychannel",
    //   query_params: { "channels": ['43'] },
    // })
  }
  public getChangeListener() {
    return this.listener
  }
  public getChangeListenerLogin() {
    return this.listenerLogin
  }
  unique(a: Array<any>, key: string = 'name'): Array<any> {
    return a.length > 0 ? this.removeDuplicates(a, key) : []
  }
  contains(array: Array<any>, obj: any, key: string): boolean {
    for (const newObj of array) {
      if (this.isEqual(newObj, obj, key)) {
        return true
      }
    }
    return false
  }
  // comparator
  isEqual(obj1: any, obj2: any, key: string) {
    if (obj1[key] === obj2[key]) {
      return true
    }
    return false
  }
  removeDuplicates(ary: Array<any>, key: string) {
    const arr = []
    return ary.filter((x: any) => {
      return !this.contains(arr, x, key) && arr.push(x)
    })
  }
}
