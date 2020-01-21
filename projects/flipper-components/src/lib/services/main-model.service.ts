import { Observable } from 'rxjs';
import { ModelService, Schema } from '@enexus/flipper-offline-database';
import { Injectable } from '@angular/core';
import { DEFAULT_FLIPPER_DB_CONFIG } from '../db-config';
@Injectable({
  providedIn: 'root'
})
export class MainModelService {
 

  constructor(private model: ModelService,private db:Schema) {
       this.db.createDb(DEFAULT_FLIPPER_DB_CONFIG.database.name,DEFAULT_FLIPPER_DB_CONFIG.database.engine);
  }

  checkTable(table){
    if(!table){
      return new Error(`ERROR: TABLE NOT FILLED`)
    }
  }
  create<T>(table:string,row:T): T | T[]{
    this. checkTable(table);
    try{
      return this.model.create<T>(table,[row]);
    }  catch (e) { throw new Error((`ERROR:${e}`)) }
    
  }
  update<T>(table:string,row:T,id:number):T {
    this. checkTable(table);
  try{
    return this.model.update<T>(table,row,id);
    }  catch (e) { throw new Error((`ERROR:${e}`)) }
  }

  delete(table:string,id:number){
    this. checkTable(table);
    try{
    return this.model.delete(table,id);
      }  catch (e) { throw new Error((`ERROR:${e}`)) }
  }

  truncate(table:string){
    try{
    return this.model.truncate(table);
       }  catch (e) { throw new Error((`ERROR:${e}`)) }
  }

  loadAll<T>(table:string):Observable<T[]>{
    this. checkTable(table);
    try{
    return this.model.get<T>(table);
      }  catch (e) { throw new Error((`ERROR:${e}`)) }
  }

  active<T>(table:string):T{
    try{
    return this.model.active<T>(table);
       }  catch (e) { throw new Error((`ERROR:${e}`)) }
  }

  find<T>(table:string,id:number):T{
    this. checkTable(table);
    try{
          return this.model.find<T>(table,id);
      }  catch (e) { throw new Error((`ERROR:${e}`)) }
  }
  filters<T>(table:string,COLUMNS:any,VALUE:string):Observable<T[]>{
    this. checkTable(table);
    try{
    return this.model.filter<T>(table,COLUMNS,VALUE);
      }  catch (e) { throw new Error((`ERROR:${e}`)) }
  }
}
