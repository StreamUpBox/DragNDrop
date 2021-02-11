
export class Variant {
  id:          string;
  name:        string;
  sku:         string;
  productId:   string;
  unit:        string;
  table:       string;
  isActive:boolean; //FIXME: add it to backend model
  channels:    string[];
  retailPrice:number; //FIXME: add it to backend side.supplyPrice
  supplyPrice:number; //FIXME: add it to backend side.
  productName: string;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name]
    }
  }
}
