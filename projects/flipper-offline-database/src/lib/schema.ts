import { ExecuteService } from './execute.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Schema extends ExecuteService {

    constructor() {
        super();
    }

    public  createDb<T>(DB: T, engine: string= ''): void {
        try {
          return this.createDatabase(DB, engine).execute();
        } catch (e) {
          throw new Error((`ERROR:${e}`));
        }
    }

    public  create<T>(TABLE: T, COLUMNS: string= 'id int(11) NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`)'): void {
        try {
          return this.createTable(TABLE, COLUMNS).execute();
        } catch (e) {
          throw new Error((`ERROR:${e}`));
        }
    }


    public show<T>(DB: T): void {
      try {
        return this.showTable(DB).execute();
      } catch (e) {
        throw new Error((`ERROR:${e}`));
      }
    }




    public  drop<T>(TABLE: T): void {
      try {
        return this.dropTable(TABLE).execute();
      } catch (e) {
        throw new Error((`ERROR:${e}`));
      }
    }

    public  rename<T>(OLDTABLE: T, NEWTABLE: T): void {
      try {
        return this.renameTable(OLDTABLE, NEWTABLE).execute();
      } catch (e) {
        throw new Error((`ERROR:${e}`));
      }
    }

    public  addColumn<T>(TABLE: T, COLUMN: string): void {
      try {
        return this.addTableColumn(TABLE, COLUMN).execute();
      } catch (e) {
        throw new Error((`ERROR:${e}`));
      }
    }

    public  renameColumn<T>(TABLE: T, COLUMN: string): void {
      try {
        return this.renameTableColumn(TABLE, COLUMN).execute();
      } catch (e) {
        throw new Error((`ERROR:${e}`));
      }
    }


    public  dropColumn<T>(TABLE: T, COLUMN: string): void {
      try {
        return this.dropTableColumn(TABLE, COLUMN).execute();
      } catch (e) {
        throw new Error((`ERROR:${e}`));
      }
    }


    public  renameTo<T>(OLDTABLE: T, NEWTABLE: T): void {
      try {
        return this.renameTableTo(OLDTABLE, NEWTABLE).execute();
      } catch (e) {
        console.log(this.query);
        throw new Error((`ERROR:${e}`));
      }
    }

  }

