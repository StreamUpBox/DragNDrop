
export class Analytic {
  // none
  totalRevenue: number;
  totalTransactions: number;
  grossProfit: number;
  storeValue: number;
  netProfit: number;
  totalCustomers: number;
  newCustomers:number;
  returningCustomers:number;
  averageSpendingPerVisit:number;
  averageVisitPerCustomer:number;
  positiveFeedback:number;
  negativeFeedback:number;
  topItemBySales: Item[];
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name]
    }
  }
}
interface Item {
  name: string;
  count: number;
  totalAmount: number;
}
