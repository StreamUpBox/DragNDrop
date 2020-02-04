export class Price {
  id?: number;
  name: string;
  branchId?: number;
  groupId?: number;
  validFrom?: any;
  validTo?: any;
  isDefault?: boolean;
  syncedOnline?: boolean;
  createdAt?: any;
  updatedAt?: any;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
