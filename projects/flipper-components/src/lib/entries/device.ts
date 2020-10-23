export class Device {
  id?: any;
  name?: string;
  branchId?: any;
  token?: string;
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

