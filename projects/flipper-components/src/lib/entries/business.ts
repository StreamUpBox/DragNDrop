export class Business {
  id?: number;
  name?: string;
  active?: boolean;
  categoryId?:number;
  currency?:string;
  country?:string;
  businessUrl?:string;
  typeId?:number;
  createdAt?:Date;
  updatedAt?:Date;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
