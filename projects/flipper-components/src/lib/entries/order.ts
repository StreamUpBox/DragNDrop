import { Shoppings } from './shopping';

export class Order {
    id?: number;
    userId?: number;
    branchId: number;
    orderNumber: any;
    customerId?: number;
    status?: string;
    reference?: string;
    orderType?: string;
    supplierId?: string;
    subTotal?: any;
    supplierInvoiceNumber?: any;
    taxRate?: any;
    taxAmount?: any;
    discountRate?: any;
    discountAmount?: any;
    cashReceived?: any;
    customerChangeDue?: any;
    saleTotal?: any;
    customerSaving?: any;
    isActive?:boolean;
    orderItems:Shoppings[];
    paymentId?: number;
    orderNote?: string;
    deliverDate?: any;
    createdAt?: any;
    updatedAt?: any;

    constructor(params: object = {}) {
        for (const name in params) {
          this[name] = params[name];
        }
      }
}


