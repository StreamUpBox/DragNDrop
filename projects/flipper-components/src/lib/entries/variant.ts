import { PriceVariant } from './price-variant';
import { Stock } from './stocks';
import { Product } from './product';

export class Variant {
  id?: number;
  SKU: any;
  name: string;
  productName?: string;
  categoryName?: string;
  brandName?: string;
  productId?: number;
  supplyPrice?: number;
  retailPrice?: number;
  wholeSalePrice?: number;
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
