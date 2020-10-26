export class PriceVariant {
  id: string;
  priceId?: any;
  variantId?: any;
  minUnit?: any;
  maxUnit?: any;
  retailPrice?: any;
  supplyPrice?: any;
  wholeSalePrice?: any;
  discount?: any;
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
  markup?: any;
  syncedOnline?: boolean;
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
