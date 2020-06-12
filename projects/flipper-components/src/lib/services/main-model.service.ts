import { Observable } from 'rxjs';
import { ModelService, Schema } from '@enexus/flipper-offline-database';

import { Injectable } from '@angular/core';
import { DEFAULT_FLIPPER_DB_CONFIG } from '../db-config';
@Injectable({
  providedIn: 'root'
})
export class MainModelService {


  constructor(private model: ModelService, private db: Schema) {
    this.db.createDb(DEFAULT_FLIPPER_DB_CONFIG.database.name, DEFAULT_FLIPPER_DB_CONFIG.database.engine);
  }

  checkTable(table) {
    if (!table) {
      return new Error(`ERROR: TABLE NOT FILLED`);
    }
  }
  create<T>(table: string, row: T): T | T[] {
    this.checkTable(table);
    try {
      return this.model.create<T>(table, [row]);
    } catch (e) { throw new Error((`ERROR:${e}`)); }

  }
  update<T>(table: string, row: T, id: any): T {
    this. checkTable(table);
    try {
      return this.model.update<T>(table, row, id);
    } catch (e) { throw new Error((`ERROR:${e}`)); }
  }

  delete(table: string, id: any) {
    this. checkTable(table);
    try {
      return this.model.delete(table, id);
    } catch (e) { throw new Error((`ERROR:${e}`)); }
  }

  truncate(table: string) {
    try {
      return this.model.truncate(table);
    } catch (e) { throw new Error((`ERROR:${e}`)); }
  }

  
  loadAll<T>(table: string): T[] {
    this.checkTable(table);
    try {
      return this.model.get<T>(table);
    } catch (e) { 
     
      throw new Error((`ERROR:${e}`));
     }
  }

  getObservable<T>(table: string): Observable<T[]> {
    this.checkTable(table);
    try {
      return this.model.getObservable<T>(table);
    } catch (e) { throw new Error((`ERROR:${e}`)); }
  }

  getQueryObservable<T>(Table: string, query: string): Observable<T[]> {
    this.checkTable(Table);
    try {
      return this.model.getQueryObservable<T>(Table, query);
    } catch (e) { throw new Error((`ERROR:${e}`)); }
  }

  active<T>(table: string, key = 'active'): T {
    try {
      return this.model.active<T>(table, key);
    } catch (e) { throw new Error((`ERROR:${e}`)); }
  }

  draft<T>(table: string, key = 'isDraft'): T {
    try {
      return this.model.draft<T>(table, key);
    } catch (e) { throw new Error((`ERROR:${e}`)); }
  }

  find<T>(table: string, id: any): T {
    this. checkTable(table);
    try {
      return this.model.find<T>(table, id);
    } catch (e) { throw new Error((`ERROR:${e}`)); }
  }

  findByFirst<T>(table: string, key = 'id', val: any): T {
    this.checkTable(table);
    try {
      return this.model.findByFirst<T>(table, key, val);
    } catch (e) { throw new Error((`ERROR:${e}`)); }
  }

  findByLast<T>(table: string, key = 'id', val: any): T {
    this.checkTable(table);
    try {
      return this.model.findByLast<T>(table, key, val);
    } catch (e) { throw new Error((`ERROR:${e}`)); }
  }

  filters<T>(table: string, COLUMNS: any, VALUE: any): T[] {
    this.checkTable(table);
    try {
      return this.model.filter<T>(table, COLUMNS, VALUE);
    } catch (e) { throw new Error((`ERROR:${e}`)); }
  }

  raw(query: string) {
    try {
        return this.model.raw(query);
       }  catch (e) { throw new Error((`ERROR:${e}`)); }
  }

}
