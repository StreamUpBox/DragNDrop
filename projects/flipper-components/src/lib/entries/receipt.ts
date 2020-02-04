export class Receipt {
  id?: number;
  businessName?: string;
  branchId?: number;
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
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

