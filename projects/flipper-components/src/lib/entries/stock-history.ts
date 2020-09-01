export class StockHistory {
  id?: any;
  orderId?: any;
  variantId?: any;
  variantName?: string;
  productId?: any;
  stockId?: any;
  reason?: string;
  quantity: any;
  isDraft?: boolean;
  isPreviously?: boolean;
  syncedOnline?: boolean;
  note?: string;
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
