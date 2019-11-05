import { TAXRATE } from '../../importables/tax-rates/api/tax-rate';
import { CustomerTypePrices } from '../../importables/customerType/api/CustomerTypePrices';
import { Stock } from '../pos';

export class OrderItems {
  id?: number;
  order_id?: number;
  stock_id?: number;
  each?: any;
  currency?: any;
  qty?: number;
  price?: any;
  total_amount_discount?: any;
  total_amount?: any;
  taxable_amount?: any;
  discount_value?: any;
  tax_rate_percentage?:any;
  customer_type_discount_value?:any;
  customer_type_name?:string;
  taxable_vat?:any;
  discount_reason_id?:number;
  refund_reason_id?:number;
  item?: string;
  tax?: any;
  item_code?:string;
  note?: string;
  batch_no?:string;
  reason_id?:number;
  tax_rate_id?:number;
  sale_price_id?:number;
  tax_rate?:TAXRATE;
  stock?:Stock;
  action?:string;
  sale_price?:CustomerTypePrices;
  available_qty?:number;
  changed_price?:number;
  lastUpdated?:boolean;
  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
