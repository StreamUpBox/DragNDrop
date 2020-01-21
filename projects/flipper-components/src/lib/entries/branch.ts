export class Branch {
  id?: number;
  name?: string;
  active?: boolean;
  businessId?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
