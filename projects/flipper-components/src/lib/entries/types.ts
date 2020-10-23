export class Types {
  id?: any;
  name?: string;
  syncedOnline?: boolean;
  table?:string;
  docId?:string;
  channels:Array<any>;
  channel?:any;
  
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

