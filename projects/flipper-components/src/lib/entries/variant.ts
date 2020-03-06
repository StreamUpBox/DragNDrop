import { PriceVariant } from './price-variant';
import { Stock } from './stocks';
import { Product } from './product';

export class Variant {
  id?: any;
  SKU: any;
  name: string;
  productName?: string;
  categoryName?: string;
  brandName?: string;
  productId?: any;
  supplyPrice?: any;
  retailPrice?: any;
  wholeSalePrice?: any;
  unit?: string;
  isActive?: boolean;
  priceVariant?: PriceVariant;
  stock?: Stock;
  product?: Product;
  markup?: any;
  syncedOnline?: boolean;
  createdAt?: any;
  updatedAt?: any;

    constructor(params: object = {}) {
        for (const name in params) {
        this[name] = params[name];
        }
    }
}
