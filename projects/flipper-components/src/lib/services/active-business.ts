import { Injectable } from '@angular/core';


import { filter } from 'rxjs/operators';
import { ActiveUser } from './active-user';
import { PouchDBService } from './pouchdb.service';
import { PouchConfig } from '../db-config';
import { Business } from '../entries';
import { CurrentBusinessEvent } from '../events';
import { FlipperEventBusService } from '@enexus/flipper-event';


@Injectable({
  providedIn: 'root'
})
export class ActiveBusiness {
  currentBusiness: Business = null;

  constructor(private eventBus: FlipperEventBusService,
              private database: PouchDBService,
              private currentUser: ActiveUser) {
    this.database.connect(PouchConfig.bucket);
    this.eventBus.of<CurrentBusinessEvent>(CurrentBusinessEvent.CHANNEL)
      .pipe(filter(e => e.business && (e.business.id !== null || e.business.id !== undefined)))
      .subscribe(res =>
        this.currentBusiness = res.business);
    this.business();
  }

  public get<K extends keyof Business>(prop: K): Business[K] {
    return this.currentBusiness && this.currentBusiness[prop];
  }

  public set(key: string, value: any): void {
    this.currentBusiness[key] = value;
  }

  public async business(table = 'businesses') {
    if (this.currentUser.get('id') !== 'undefined' || this.currentUser.get('id') !== undefined || this.currentUser.get('id') !== null) {
      await this.database.activeBusiness(this.currentUser.get('id'), table).then(res => {
        if (res.docs && res.docs.length > 0) {
          this.eventBus.publish(new CurrentBusinessEvent(res.docs[0]));
        }
      }, error => {
        if (error.error && error.status === '404' || error.status === 404) {
          this.eventBus.publish(new CurrentBusinessEvent(null));
        }
      });
    }


  }

}
