
  export class Labels {
    id?: any;
    name?: string;
    sku?: string;
    chanels?:any;
    chanel?:any;


  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

