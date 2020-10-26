export class Branch {
  id?: any;
  name?: string;
  active?: boolean;
  businessId?: any;
  syncedOnline?: boolean;
  mapLatitude?: any;
  mapLongitude?: any;
  createdAt?: Date;
  updatedAt?: Date;
  table?:string;
  docId?:string;
  channels:Array<string>;
  channel?:any;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
