export class Taxes {
  id?: any;
  name?: string;
  percentage?: any;
  businessId?: any;
  active?: boolean;
  isDefault?: boolean;
  syncedOnline?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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
