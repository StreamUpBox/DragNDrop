export class BusinessCategory {
  id?: any;
  name?: string;
  typeId?: any;
  syncedOnline?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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

