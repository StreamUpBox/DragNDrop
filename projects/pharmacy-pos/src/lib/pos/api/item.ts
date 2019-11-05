import { CustomerType } from '../../importables/customerType/api/CustomerType';



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
  tax_rate?:any;
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
