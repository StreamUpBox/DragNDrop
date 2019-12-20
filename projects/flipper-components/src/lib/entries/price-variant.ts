export class PriceVariant {
  id?: number;
  priceId?: number;
  variantId?: number;
  minUnit?: number;
  maxUnit?: number;
  retailPrice?: number;
  supplyPrice?: number;
  wholeSalePrice?: number;
  discount?: number;
  markup?: number;
  createdAt?: any;
  updatedAt?: any;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
