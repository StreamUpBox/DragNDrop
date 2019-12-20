export class Product {
  id?: number;
  name: string;
  branchId?: number;
  supplierId?: number;
  isManufactured?: boolean;
  isBatchTracked?: boolean;
  isStandardProduct?: boolean;
  isProductWithVariants?: boolean;
  isCompositeProduct?: boolean;
  enableTrackingInventory?: boolean;
  categoryId?: number;
  brandId?: number;
  isActive?: boolean;
  isOnPos?: boolean;
  createdAt?: any;
  updatedAt?: any;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
