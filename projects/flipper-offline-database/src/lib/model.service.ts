import {
  Injectable
} from '@angular/core';
import { Observable } from 'rxjs';
import { ExecuteService } from './execute.service';


@Injectable({
  providedIn: 'root'
})
export class ModelService extends ExecuteService {

  constructor() {super();
}


  get<T>(): Observable<T[]> {
    try {
      return this.execute();
    } catch (e) {
      // TODO: notify any error in plugin to
      throw new Error((`ERROR:${e}`));
    }
  }

  filter(TABLE: string, COLUMNS: any, VALUE: any) {
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

    return this.select(TABLE).condition(condition).get();

    } catch (e) {
     throw new Error((`ERROR:${e}`));
    }
  }



  create <T>(TABLE: string, ROWS: T[]): void {
    try {
         ROWS.forEach(ROW => {
          this.insert<T>(TABLE, ROW).execute();
         });
    } catch (e) {
     throw new Error((`ERROR:${e}`));
    }
  }

  update<T>(TABLE: string, ROW: T, id: number): void {
    try {

          return this.updateRow<T>(TABLE, ROW, id).execute();

     } catch (e) {
       throw new Error((`ERROR:${e}`));
     }
  }


  truncate <T>(TABLE: T): void {
    try {

         return this.truncateRows<T>(TABLE).execute();

        } catch (e) {
          throw new Error((`ERROR:${e}`));
        }
  }

  delete < T >(TABLE: T, id: number): void {
    try {
         return this.deleteRow< T >(TABLE, id).execute();

        } catch (e) {
          throw new Error((`ERROR:${e}`));
        }
  }


  find() {

  }



}
