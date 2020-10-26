export class Branch {
  id: string;
  name: string;
  active: boolean;
  businessId: any;
  syncedOnline?: boolean;
  mapLatitude?: any;
  mapLongitude?: any;
  createdAt: Date;
  updatedAt: Date;
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
