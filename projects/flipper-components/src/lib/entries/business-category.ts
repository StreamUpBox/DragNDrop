export class BusinessCategory {
  id?: number;
  name?: string;
  typeId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

