import { Orders } from '../orders/orders';
import { TAXRATE } from '../tax-rates/api/tax-rate';
import { Customer } from '../customers/customer';
import { CustomerType } from '../customerType/api/CustomerType';
import { User } from '../types/models/User';
import { Branch, Business } from '../../pos/pos';
import { OrderItems } from '../../pos/cart/order_items';

export class Pay {

  id?:number;
  order?:Orders;
  order_items?:OrderItems[];
  payment_method?:string;
  invoice_no?:string;
  invoice_date?:Date;
  discounts?:number;
  total_items?:number;
  tax?:number
  amount?:number;
  amount_given?:number;
  amount_return?:number;
  currency?:string;
  status?:string;
  pos_session_id?:number;
  branch_id?:number;
  customer_id?:number;
  insurance_id?:number;
  created_at?:Date;
  updated_at?:Date;

    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }

}


export class Invoice {
  id?: number;
  invoice_id?: number;
  invoice_no?: any;
  invoice_date?:Date;
  payment_method?:PaymentMethod;
  status?:Status;
  total_discounts?:number;
  taxable_vat?:number;
  total_items?:number;
  total_amount?:any;
  amount_given?:number;
  amount_return?:any;
  branch_id?:number;
  tax_rate_id?:number;
  order_id?:number;
  business_id?:number;
  customer_id?:number;
  customer_type_id?:number;
  currency?:string;
  created_at?:Date;
  updated_at?:Date;
  order?:Orders;
  orderItems?:OrderItems[]=[];
  taxRate?:TAXRATE;
  branch?:Branch;
  customer?:Customer;
  customer_type?:CustomerType;
  company_total_amount_discount?:any;
  company_discount_value?:any;
  customer_type_discount_value?:any;
  printFormat?:Array<CustomizeInvoice>;
  business?:Business;
  user?:User;
  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
export enum PaymentMethod{
  CASH = 'Cash',
  CARD = 'Card',
  OTHER = 'Other'
}
export enum Status{
  COMPLETE = 'complete',
  PENDING = 'pending',
  CANCEL = 'cancel'
}

export class CustomizeInvoice {
id?:number;
company_name?: string;
address?: string;
contact?: string;
tax_number?: string;
logo?: string;
font_size?: number;
color?: string;
due_days?: number;
default_title?: string;
default_sub_title?: string;
default_footer?: string;
memo?: string;
items?: string;
units?: string;
price?: string;
amount?: string;
number?: string;
adherent?: string;
done_at?: string;
done_title?:string;
done_on?:string;
nom_signature_cachet?: string;
reception_title?: string;
reception_field_a?: string;
reception_field_b?: string;
reception_field_c?: string;
reception_field_d?: string;
reception_field_e?: string;
customer_name?: string;
customer_number?: string;
customer_dob?: string;
customer_address?: string;
beneficiary?: string;
customer_type_name?: string;
hide_discount_table?: boolean;
hide_taxable_table?: boolean;
hide_total_summary_table?: boolean;
hide_reception_table?: boolean;
hide_visa?: boolean;
hide_logo?: boolean;
is_default?: boolean;
has_customer_type?:boolean;
business_id?:number;
customerTypeIds?:Array<number>;
customerTypes?:Array<CustomerType>;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
