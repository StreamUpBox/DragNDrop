export class Stock {

  id?: any;
  branchId?: any;
  variantId?: any;
  productId?: any;
  reasonId?: any;
  unitId?: any;
  lowStock?: any;
  currentStock?: any;
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
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
