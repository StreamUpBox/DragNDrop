export class StockHistory {
  id?: any;
  orderId?: any;
  variantId?: any;
  variantName?: string;
  productId?: any;
  stockId?: any;
  reason?: string;
  quantity: any;
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
  isDraft?: boolean;
  isPreviously?: boolean;
  syncedOnline?: boolean;
  note?: string;
  createdAt?: any;
  updatedAt?: any;
  table?:string;
  docId?:string;
  channels:Array<any>;
  channel?:any;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
