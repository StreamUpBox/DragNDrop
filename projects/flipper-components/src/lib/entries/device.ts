export class Device {
  id?: number;
  name?: string;
  branchId?: number;
  token?: string;
  syncedOnline?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

