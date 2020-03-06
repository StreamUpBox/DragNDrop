export class Stock {

  id?: any;
  branchId?: any;
  variantId?: any;
  reasonId?: any;
  unitId?: any;
  lowStock?: any;
  currentStock?: any;
  supplyPrice?: 0;
  retailPrice?: 0;
  wholeSalePrice?: 0;
  active?: boolean;
  inStock?: any;
  syncedOnline?: boolean;
  canTrackingStock?: boolean;
  showlowStockAlert?: boolean;
  createdAt?: any;
  updatedAt?: any;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
