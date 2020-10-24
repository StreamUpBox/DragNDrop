export class BranchProducts {
  id?: any;
  branchId?: any;
  productId?: any;
  syncedOnline?: boolean;
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
