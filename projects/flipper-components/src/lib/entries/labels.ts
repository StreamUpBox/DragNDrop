
  export class Labels {
    id?: any;
    name?: string;
    sku?: string;
    channels:Array<string>;
    channel?:any;


  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

