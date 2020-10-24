export class Stock {

  id?: any;
  branchId?: any;
  variantId?: any;
  productId?: any;
  reasonId?: any;
  unitId?: any;
  lowStock?: any;
  currentStock?: any;
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
  supplyPrice?: any;
  retailPrice?: any;
  wholeSalePrice?: 0;
  active?: boolean;
  inStock?: any;
  syncedOnline?: boolean;
  canTrackingStock?: boolean;
  showLowStockAlert?: boolean;
  createdAt?: any;
  updatedAt?: any;
  table?:string;
  docId?:string;
  channels:Array<string>;
  channel?:any;
  userId?: any;
  
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
