
  export class Labels {
    id?: any;
    name?: string;
    sku?: string;


  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

