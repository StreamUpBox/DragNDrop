export class BranchProducts {
  id?: number;
  branchId?: number;
  productId?: number;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
