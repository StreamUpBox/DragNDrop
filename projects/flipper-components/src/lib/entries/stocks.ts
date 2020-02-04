export class Stock {

  id?: number;
  branchId?: number;
  variantId?: number;
  reasonId?: number;
  unitId?: number;
  lowStock?: number;
  currentStock?: number;
  supplyPrice?: 0;
  retailPrice?: 0;
  wholeSalePrice?: 0;
  active?: boolean;
  inStock?: number;
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
