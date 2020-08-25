export class UserBusiness {
  id?: any;
  userId?: any;
  businessId?: any;
  role?: string;
  permissions?: any;
  table?: string;
  docId?: string;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
