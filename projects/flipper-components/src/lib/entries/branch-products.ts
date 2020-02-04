export class BranchProducts {
  id?: number;
  branchId?: number;
  productId?: number;
  syncedOnline?: boolean;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
