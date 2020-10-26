export class StockHistory {
  id: string;
  orderId?: string;
  variantId?: string;
  variantName?: string;
  productId?: string;
  stockId?: any;
  reason?: string;
  quantity: any;
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
  isDraft?: boolean;
  isPreviously?: boolean;
  syncedOnline?: boolean;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
  table:string;
  docId?:string;
  channels:Array<string>;

  channel?:string;


  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
