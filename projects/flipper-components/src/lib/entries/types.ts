export class Types {
  id?: any;
  name?: string;
  syncedOnline?: boolean;
  table?:string;
  docId?:string;
  chanels?:any;
  chanel?:any;
  
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

