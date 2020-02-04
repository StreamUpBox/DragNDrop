export class UserBusiness {
  id?: number;
  userId?: number;
  businessId?: number;
  syncedOnline?: boolean;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
