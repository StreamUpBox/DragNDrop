import {
  Table
} from './table';
import { QueryService } from './query.service';
import * as alasql from 'alasql';
const sql = alasql;

export class ExecuteService extends QueryService {


  constructor() {super(); }

  execute() {
    this.callback = (res) => {
      return res;
    };

    return this.extra ? sql(this.query, this.extra, this.callback) : sql(this.query);


  }
 
}
