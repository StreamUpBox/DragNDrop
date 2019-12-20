export class Variant {
  id?:number; 
  supplierId?:number;
  sku:any;
  name:string;
  productName?:string;
  categoryName?:string;
  brandName?:string;
  variantableId?:number;
  variantableType?:string;
  supplierCode?:number;
  markup?:any;
  createdAt?:any;
  updatedAt?:any;

    constructor(params: object = {}) {
        for (const name in params) {
        this[name] = params[name];
        }
    }
}
