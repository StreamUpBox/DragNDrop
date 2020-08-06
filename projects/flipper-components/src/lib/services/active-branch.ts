import { Injectable } from '@angular/core';
import { PouchDBService } from './pouchdb.service';
import { PouchConfig } from '../db-config';
import { FlipperEventBusService } from '@enexus/flipper-event';

import { filter } from 'rxjs/operators';
import { ActiveBusiness } from './active-business';
import { Branch } from '../entries';
import { CurrentBranchEvent } from '../events';


@Injectable({
  providedIn: 'root'
})
export class ActiveBranch {
currentBranch: Branch=null;

  constructor(private eventBus: FlipperEventBusService,
    private database: PouchDBService,
    private currentBusiness:ActiveBusiness) {
    this.database.connect(PouchConfig.bucket);
    this.eventBus.of < CurrentBranchEvent > (CurrentBranchEvent.CHANNEL)
    .pipe(filter(e => e.branch && (e.branch.id !== null ||  e.branch.id !==undefined)))
    .subscribe(res =>
      this.currentBranch = res.branch);
       this.branch();
  }

  public get<K extends keyof Branch>(prop: K): Branch[K] {
    return this.currentBranch && this.currentBranch[prop];
  }


  public set(key: string, value: any): void {
    this.currentBranch[key] = value;
  }


  public async branch(table='branches') {
    if( this.currentBusiness.get('id')!='undefined' || this.currentBusiness.get('id')!=undefined || this.currentBusiness.get('id')!=null){
       await this.database.activeBranch(this.currentBusiness.get('id'),table).then(res=>{
          if(res.docs && res.docs.length > 0){
              this.eventBus.publish(new CurrentBranchEvent(res.docs[0]));
          }
  },error=> {
      if(error.error && error.status==='404' ||  error.status===404) {
        this.eventBus.publish(new CurrentBranchEvent(null));
      }
  });
}


  }

}
