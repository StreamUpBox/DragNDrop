export class Taxes {
  id: string;
  name: string;
  percentage?: any;
  businessId?: any;
  active?: boolean;
  isDefault?: boolean;
  syncedOnline?: boolean;
  createdAt: string;
  updatedAt: string;
  table:string;
  docId?:string;
  channels:Array<string>;

  channel?:string;

  
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
