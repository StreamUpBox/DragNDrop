export class StockHistory {
  id?: number;
  orderId?: number;
  variantId?: number;
  variantName?: string;
  stockId?: number;
  reason?: string;
  quantity: number;
  isDraft?: boolean;
  isPreviously?: boolean;
  syncedOnline?: boolean;
  note?: string;
  createdAt?: any;
  updatedAt?: any;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
