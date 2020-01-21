export class UserBusiness {
  id?: number;
  userId?: number;
  businessId?: number;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
