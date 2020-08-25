export class Device {
  id?: any;
  name?: string;
  branchId?: any;
  token?: string;
  syncedOnline?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  table?: string;
  docId?: string;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

