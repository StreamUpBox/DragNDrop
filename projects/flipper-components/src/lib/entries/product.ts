export class Product {
  id?: number;
  name: string;
  description?: string;
  picture?: string;

  branchId?: number;
  businessId?: number;
  supplierId?: number;
  isManufactured?: boolean;
  isBatchTracked?: boolean;
  isStandardProduct?: boolean;
  isProductWithVariants?: boolean;
  isCompositeProduct?: boolean;
  enableTrackingInventory?: boolean;
  categoryId?: number;
  brandId?: number;
  taxId?: number;
  active?: boolean;
  hasPicture?: boolean;
  isDraft?: boolean;
  isOnPos?: boolean;
  createdAt?: any;
  updatedAt?: any;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
