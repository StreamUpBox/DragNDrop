export class Shopping {
  id?:number;
  orderId?:number;
  variantId?:number;
  variantName?:number;
  price?:any;
  quantity:number;
  sub_total?:number;
  tax_rate?:number;
  tax_amount?:number;
  discount_rate?:number;
  discount_amount?:number;
  note?:string;
  createdAt?:any;
  updatedAt?:any;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
