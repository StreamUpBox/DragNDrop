
import { Variant } from './variant';
import { Stock } from './stocks';
import { Product } from './product';

export class OrderDetails {
  id?: number;
  orderId?: number;
  variantId?: number;
  stockId?: number;
  SKU?: string;
  unit?: string;
  variantName?: string;
  productName?: string;
  stock?: Stock;
  variant?: Variant;
  product?: Product;
  price?: any;
  quantity: number;
  subTotal?: number;
  taxRate?: number;
  taxAmount?: number;
  discountRate?: number;
  discountAmount?: number;
  syncedOnline?: boolean;
  canTrackStock?: boolean;
  note?: string;
  createdAt?: any;
  updatedAt?: any;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
