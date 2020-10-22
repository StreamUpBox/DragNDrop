export class Receipt {
  id?: any;
  businessName?: string;
  branchId?: any;
  digitalLogo?: string;
  printedLogo?: string;
  showLocation?: string;
  color?: string;
  address1?: string;
  address2?: string;
  showItemNote?: boolean;
  city?: string;
  customerText?: string;
  returnPolicy?: string;
  syncedOnline?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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

