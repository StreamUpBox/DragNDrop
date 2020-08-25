import { QueryService } from './query.service';
import alasql from 'alasql';

export class ExecuteService extends QueryService {

  constructor() { super(); }

  execute() {
    this.callback = (res) => {
      return res;
    };

    return this.extra ? alasql(this.query, this.extra, this.callback) : alasql(this.query);

  }

}
