
import { Variant } from './variant';
import { Stock } from './stocks';
import { Product } from './product';

export class OrderDetails {
  id?: any;
  orderId?: any;
  variantId?: any;
  stockId?: any;
  SKU?: string;
  unit?: string;
  variantName?: string;
  productName?: string;
  stock?: Stock;
  variant?: Variant;
  product?: Product;
  price?: any;
  quantity: any;
  subTotal?: any;
  taxRate?: any;
  taxAmount?: any;
  discountRate?: any;
  discountAmount?: any;
  syncedOnline?: boolean;
  canTrackStock?: boolean;
  note?: string;
  createdAt?: any;
  updatedAt?: any;
  table?:string;
  docId?:string;
  chanels?:any;
  chanel?:any;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
