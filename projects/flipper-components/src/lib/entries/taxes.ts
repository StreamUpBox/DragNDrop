export class Taxes {
  id?: any;
  name?: string;
  percentage?: any;
  businessId?: any;
  active?: boolean;
  isDefault?: boolean;
  syncedOnline?: boolean;
  createdAt?: Date;
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
  updatedAt?: Date;
  table?:string;
  docId?:string;
  
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
