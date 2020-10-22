export class Price {
  id?: any;
  name: string;
  branchId?: any;
  groupId?: any;
  validFrom?: any;
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
  validTo?: any;
  isDefault?: boolean;
  syncedOnline?: boolean;
  createdAt?: any;
  updatedAt?: any;
  table?:string;
  docId?:string;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
