import { Orders } from '../importables/orders/orders';
import { Customer } from '../importables/customers/customer';
import { CustomerType } from '../importables/customerType/api/CustomerType';


export class Item {
  id?:number;
  item:string;
  item_id?:number;
  sku:string;
  upc?:number;
  summary?:string;
  manufacturer?:string;
  unit_cost:number;
  category_id?:number;
  category?:{name:string};
  barcode?:string;
  unit_sale?:number;
  currency?:string;
  customer_type_items?:CustomerType;
  brand?:any;
  tax_rate?:TAXRATE;
  cost_price_excluding_tax?:number;
  cost_price_including_tax?:number;
  margin?:number;
  recommended_retail_price?:number;

    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}

export class TAXRATE {
  name?: string;
  id?: number;
  tax_rate_id?: number;
  active?: number;
  description?: string;
  percentage?: number;
  tax_type?:string;
  tax_code?:string;
  business_id?:number;
  created_at?: any;
  updated_at?: any;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}


export class Reason {
  name?: string;
  id?: number;
  reason_id?: number;
  is_active?: number;
  description?: string;
  type?:string;
  reason_type?:string;
  discount_value?:number;
  return_to_stock?:string;
  stock_movements_status?:string;
  business_id?:number;
  created_at?: any;
  updated_at?: any;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}

export class CustomerTypePrices {
  id?: number;
  customer_type_id?: number;
  customer_type?:CustomerType;
  active?: number;
  created_at?: any;
  updated_at?: any;
  item_id?:number;
  sale_price_excluding_tax?:number;
  sale_price_including_tax?:number;
  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}

export class Category {
  name?: string;
  id?: number;
  category_id?: number;
  active?: number;
  color?:string;
  parent_id?: number;
  business_id?: number;
  created_at?: any;
  updated_at?: any;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}



export class Stock {
  id?: number;
  stock_transctions: [{ id: number, stock_id: number, quantity: number,batch_no?:string, unit_price?:any;currency?:string;type: string, transaction: string, comments: string, transction_date: string, branch_id: number, created_at: string, updated_at: string,reason_id?:number;reason?:Reason }];
  customer_type_items?:CustomerTypePrices[]=[];
  customer_price?:CustomerTypePrices;
  customer_type?:CustomerType;
  created_at: string;
  updated_at: string;
  minimum_stock_counts: number;
  expired_date: string;
  item: Item;
  tax_rate?:TAXRATE;
  name?: string;
  sku?: string;
  price: number;
  category_id?: number;
  category?: Category;
  qty?: string;
  sale_price?: string;
  stock_id?: number;
  currency?: string;
  status?: any;
  available_stock_qty?: number;
  in_stock_qty?: number;
  weight?: number;
  unit_of_measure?: string;
  item_id?: number;
  branch_id?: number;
  branch?: any;
  unit_of_sale?:number;
  item_entries: {};
  item_soldout: {};
  min_stock?:number;
  max_stock?:number;
  on_order?: number;
  show_alert?: boolean;
  unit_of_sal?: string;
  unit_of_volume?: string;
  available: any[] | Stock[];
  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
export class StockMovements {
  id?: number;
   stock_id?: number;
   quantity?: number;
   batch_no?:string;
    type: string;
    transaction: string;
    comments: string;
      branch_id: number;
       created_at: string;
        updated_at: string;
        reason_id?:number;
        reason?:Reason;
        transction_date?:Date;
        manufacture_date?:Date;
        expired_date?:Date;
        in_qty?:number;
        out_qty?:number;
        total_qty?:number;
        item?:Object={};
   constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
  }



export class Pos {
  id?: number;
  loading: boolean;
  currently_ordered?: Orders;
  choose_customer?: Customer;
  panel_content?: string;
  stocks?:Stock[]=[];
  orders?:Orders[]=[];

  customer_type_price?:CustomerType;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
export class Branch {
  name?: string;
  description?:string;
  id?: number;
  branch_id?: number;
  active?: number;
  business_id?: number;
  created_at?: any;
  updated_at?: any;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}


export class Business {
  name:string;
  type:string;
  address?:string;
  tin?:string;
  description?:string;
  id?:number;
  bussiness_id?: number;
  tax_charge?: any;
  currency_code?: any;
  currency_symbol?: any;
  web_url?: string;
  zip_code?: any;
  is_active?: boolean;
  created_at?:any;
  updated_at?:any;
  user_logged_in?: any;
  user_logged_role?: any;
  branchies?: any;
  users_belongs?: any;
  category?:string;
  phone?:string;
  email?:string;
  city?:string;
  country?:string;
  street1?:string;
  street2?:string;
  street3?:string;
  logo?:string;
  branches?:Branch[]
  receipt?:null;
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
  isSubmenu?:boolean
}
