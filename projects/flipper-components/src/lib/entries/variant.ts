import { PriceVariant } from './price-variant';

export class Variant {
  id?: number;
  SKU: any;
  name: string;
  productName?: string;
  categoryName?: string;
  brandName?: string;
  itemId?: number;
  supplyPrice?: number;
  retailPrice?: number;
  wholeSalePrice?:number;
  unitId?:number;
  isActive?: boolean;
  priceVariant?: PriceVariant;
  markup?: any;
  createdAt?: any;
  updatedAt?: any;

    constructor(params: object = {}) {
        for (const name in params) {
        this[name] = params[name];
        }
    }
}
