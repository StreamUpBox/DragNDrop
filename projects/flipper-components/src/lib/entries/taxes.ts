export class Taxes {
  id?: number;
  name?: string;
  percentage?: number;
  businessId?: number;
  active?: boolean;
  isDefault?:boolean;
  createdAt?:Date;
  updatedAt?:Date;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
