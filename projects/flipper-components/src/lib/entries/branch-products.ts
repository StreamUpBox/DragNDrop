export class BranchProducts {
  id?: any;
  branchId?: any;
  productId?: any;
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
