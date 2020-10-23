export class UserBusiness {
  id?: any;
  userId?: any;
  businessId?: any;
  role?: string;
  permissions?: any;
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
