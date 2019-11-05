
import { Customer } from '../customers/customer';
import { CustomerType } from '../customerType/api/CustomerType';
import { OrderItems } from '../../pos/cart/order_items';
import { Invoice } from '../pay/pay';
import { Branch } from '../../pos/pos';

export class Orders {

  id?: number;
  created_at?: Date;
  updated_at?: Date;
  status?: string;
  customer_id?: number;
  is_currently_processing?: any;
  all?: string;
  user?: any;
  customer?: Customer;
  customer_type?:CustomerType;
  order_items?: OrderItems[] = [];
  branch_id?: number;
  business_id?: number;
  invoice?:Invoice;
  order_no?:string;
  reference?:string;
  order_status?:string;
  supplier_invoice?:string;
  order_due_date?:any;
  deliver_to_id?:number;
  transfer_to_id?:number;
  transfer_from_id?:number;
  order_from_id?:number;
  delicerTo?:Branch;
  supplier?:any;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }

}
