export class Shoppings {
  id?: number;
  orderId?: number;
  variantId?: number;
  variantName?: string;
  price?: any;
  quantity: number;
  subTotal?: number;
  taxRate?: number;
  taxAmount?: number;
  discountRate?: number;
  discountAmount?: number;
  note?: string;
  createdAt?: any;
  updatedAt?: any;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
