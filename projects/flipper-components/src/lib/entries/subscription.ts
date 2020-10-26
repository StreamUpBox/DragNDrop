export class Subscription {
  id: string;
  userId?: string;
  subscriptionType?: string;
  lastPaymentDate?: Date;
  nextPaymentDate?: Date;
  status?: string;
  didSubscribed?: boolean;
  createdAt: Date;
  updatedAt: Date;
  table:string;
  docId?:string;
  channels:Array<string>;
  channel?:string;
  
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

