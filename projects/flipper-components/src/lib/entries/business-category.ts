export class BusinessCategory {
  id?: number;
  name?: string;
  typeId?: number;
  syncedOnline?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

