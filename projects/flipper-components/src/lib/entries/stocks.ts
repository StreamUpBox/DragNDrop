export class Stock {

  id?: number;
  branchId?: number;
  variantId?: number;
  reasonId?: number;
  unitId?: number;
  lowStock?: number;
  currentStock?: number;
  active?: boolean;
  inStock?: number;
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
