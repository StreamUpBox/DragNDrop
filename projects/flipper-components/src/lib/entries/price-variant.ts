export class PriceVariant {
  id?: any;
  priceId?: any;
  variantId?: any;
  minUnit?: any;
  maxUnit?: any;
  retailPrice?: any;
  supplyPrice?: any;
  wholeSalePrice?: any;
  discount?: any;
  markup?: any;
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
