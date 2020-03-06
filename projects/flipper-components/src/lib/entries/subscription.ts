export class Subscription {
  id?: any;
  userId?: any;
  subscriptionType?: string;
  lastPaymentDate?: Date;
  nextPaymentDate?: Date;
  status?: string;
  didSubscribed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

