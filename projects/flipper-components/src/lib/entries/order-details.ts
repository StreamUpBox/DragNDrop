
import { Variant } from './variant';
import { Stock } from './stocks';
import { Product } from './product';

export class OrderDetails {
  id: string;
  orderId: string;
  variantId: string;
  stockId: string;
  sku?: string;
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
  createdAt: string;
  updatedAt: string;
  table:string;
  docId?:string;
  channels:Array<string>;
  channel?:string;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
