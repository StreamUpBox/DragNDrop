import { Injectable } from '@angular/core';

import { FlipperEventBusService } from '@enexus/flipper-event';

import { filter } from 'rxjs/operators';
import { PouchDBService } from './pouchdb.service';
import { PouchConfig } from '../db-config';
import { User } from '../entries';
import { UserLoggedEvent } from '../events';

@Injectable({
  providedIn: 'root'
})
export class ActiveUser {
currentUser: User=null;

  constructor(private eventBus: FlipperEventBusService,private database: PouchDBService) {
    this.database.connect(PouchConfig.bucket);
       this.init();
       
  }
public init(){
  
  this.user();

  this.eventBus.of < UserLoggedEvent > (UserLoggedEvent.CHANNEL)
  .pipe(filter(e => e.user && (e.user.id !== null ||  e.user.id !==undefined)))
  .subscribe(res =>
    this.currentUser = res.user);
}
  public get<K extends keyof User>(prop: K): User[K] {
    return this.currentUser && this.currentUser[prop];
  }


  public set(key: string, value: any): void {
    this.currentUser[key] = value;
  }


  public async user(table=null) {

   await this.database.activeUser().then(res=>{
      if(res.docs && res.docs.length > 0){
          this.eventBus.publish(new UserLoggedEvent(res.docs[0]));
      }
  },error=> {
      if(error.error && error.status==='404' ||  error.status===404) {
        this.eventBus.publish(new UserLoggedEvent(null));
      }
  });


  }

}
