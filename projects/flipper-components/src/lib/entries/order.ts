import { DecimalPipe } from '@angular/common';

export class Order {
    id?: number;
    userId?: number;
    branchId: number;
    orderNumber: any;
    customerId?: number;
    status?: any;
    reference?: string;
    orderType?: string;
    supplierId?: string;
    subTotal?: DecimalPipe;
    supplierInvoiceNumber?: any;
    taxRate?: any;
    taxAmount?: DecimalPipe;
    discountRate?: any;
    discountAmount?: DecimalPipe;
    cashReceived?: DecimalPipe;
    customerChangeDue?: DecimalPipe;
     saleTotal?: DecimalPipe;
    customerSaving?: DecimalPipe;
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
