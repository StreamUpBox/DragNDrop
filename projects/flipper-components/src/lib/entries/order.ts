import { OrderDetails } from './order-details';
import { Branch } from './branch';

export class Order {
    id?: any;
    userId?: any;
    branchId: any;
    orderNumber: any;
    customerId?: any;
    status?: string;
    reference?: string;
    // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
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
    paymentId?: any;
    orderNote?: string;
    deliverDate?: Date;
    syncedOnline?: boolean;
    branch?: Branch;
    orderDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    table?:string;
    docId?:string;
    channels:Array<string>;
    channel?:any;

    constructor(params: object = {}) {
        for (const name in params) {
          this[name] = params[name];
        }
      }
}


