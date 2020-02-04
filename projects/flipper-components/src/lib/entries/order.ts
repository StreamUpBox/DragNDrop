import { OrderDetails } from './order-details';

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
    active?: boolean;
    isDraft?: boolean;
    orderItems: OrderDetails[];
    paymentId?: number;
    orderNote?: string;
    deliverDate?: Date;
    syncedOnline?: boolean;
    orderDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(params: object = {}) {
        for (const name in params) {
          this[name] = params[name];
        }
      }
}


