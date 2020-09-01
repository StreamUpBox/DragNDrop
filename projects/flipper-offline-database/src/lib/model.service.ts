import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExecuteService } from './execute.service';


@Injectable({
  providedIn: 'root'
})
export class ModelService extends ExecuteService {


  constructor() {
    super();
  }
  raw(query?: string) {
    try {
         this.query = query;
         return this.execute();
    } catch (e) {
      // TODO: notify any error in plugin to
      throw new Error((`ERROR:${e}`));
    }
  }

  get<T>(Table?: string): T[] {
    try {
      if (Table) {
        return  this.select(Table).execute();
      } else {
        
        return this.execute();
      }
    } catch (e) {
      
      throw new Error((`ERROR:${e}`));
    }
  }

  getObservable<T>(Table?: string): Observable<T[]> {
    try {
      if (Table) {
        return this.select(Table).execute();
      } else {
        return this.execute();
      }

    } catch (e) {
      // TODO: notify any error in plugin to
      throw new Error((`ERROR:${e}`));
    }
  }

  getQueryObservable<T>(Table: string, query: string): Observable<T[]> {
    try {
      if (Table) {
        return this.select(Table).condition(query).getObservable<T>();
      } else {
        return this.execute();
      }

    } catch (e) {
      // TODO: notify any error in plugin to
      throw new Error((`ERROR:${e}`));
    }
  }

  //

  first<T>(): T {
    try {
      return this.orderBy('id', 'DESC').get<T>()[0];
    } catch (e) {
      // TODO: notify any error in plugin to
      throw new Error((`ERROR:${e}`));
    }
  }

  queries<T>(TABLE: string, condition: string): T[] {
    try {
      return this.select(TABLE).condition(condition).get<T>();
    } catch (e) {
      // TODO: notify any error in plugin to
      throw new Error((`ERROR:${e}`));
    }
  }

  row<T>(TABLE: string, COLUMNS: string, condition: string): T[] {
    try {
      return this.select(TABLE, COLUMNS).condition(condition).get<T>();
    } catch (e) {
      // TODO: notify any error in plugin to
      throw new Error((`ERROR:${e}`));
    }
  }

  last<T>(): T {
    try {
      return this.orderBy('id', 'ASC').get<T>()[0];
    } catch (e) {
      // TODO: notify any error in plugin to
      throw new Error((`ERROR:${e}`));
    }
  }

  filter<T>(TABLE: string, COLUMNS: any, VALUE: any): T[] {
    try {
      let condition = '';
      if (Array.isArray(COLUMNS)) {
        if (COLUMNS.length > 0) {
          COLUMNS.forEach((el, i) => {
            if (i === 0) {
              const like = el + ' LIKE "%' + VALUE + '%" ';
              condition += like;
            } else {
              const like = ' OR ' + el + ' LIKE "%' + VALUE + '%" ';
              condition += like;
            }

          });
        }
      } else {
        condition = COLUMNS + ' LIKE "' + VALUE + '" ';
      }

      return this.select(TABLE).condition(condition).get<T>();




    } catch (e) {
      throw new Error((`ERROR:${e}`));
    }
  }



  create<T>(TABLE: string, ROWS: T[]): T[] {
    try {
      const inserted = [];
      if (ROWS.length > 0) {
        ROWS.forEach(ROW => {
          this.insert<T>(TABLE, ROW).execute();
          inserted.push(ROW);
        });
        return inserted.length === 1 && inserted.length > 0 ? inserted[0] : inserted;
      } else {
        return [];
      }

    } catch (e) {
      throw new Error((`ERROR:${e}`));
    }
  }

  update<T>(TABLE: string, ROW: T, id: any): T {
    try {

      this.updateRow<T>(TABLE, ROW, id).execute();
      return ROW;

    } catch (e) {
      throw new Error((`ERROR:${e}`));
    }
  }


  truncate<T>(TABLE: T): void {
    try {

      return this.truncateRows<T>(TABLE).execute();

    } catch (e) {
      throw new Error((`ERROR:${e}`));
    }
  }

  delete<T>(TABLE: T, id: any): void {
    try {
      return this.deleteRow<T>(TABLE, id).execute();

    } catch (e) {
      throw new Error((`ERROR:${e}`));
    }
  }


  find<T>(Table: string, id: any): T {
    try {
      return this.select(Table).where('id', id).first<T>();
    } catch (e) {
      throw new Error((`ERROR:${e}`));
    }
  }
  findByFirst<T>(Table: string, key = 'id', val: any): T {
    try {
      return this.select(Table).where(key, val).first<T>();
    } catch (e) {
      throw new Error((`ERROR:${e}`));
    }
  }

  findByLast<T>(Table: string, key = 'id', val: any): T {
    try {
      return this.select(Table).where(key, val).last<T>();
    } catch (e) {
      throw new Error((`ERROR:${e}`));
    }
  }


  active<T>(Table: string, key = 'active'): T {
    try {
      return this.select(Table).where(key, true).first<T>();
    } catch (e) { throw new Error((`ERROR:${e}`)); }
  }


  draft<T>(Table: string, key = 'isDraft'): T {
    try {
      return this.select(Table).where(key, true).first<T>();
    } catch (e) { throw new Error((`ERROR:${e}`)); }
  }



}
