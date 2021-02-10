import './item'
export class Analytic{
  totalRevenue: number;
  totalTransactions:number;
  grossProfit: number;
  storeValue: number;
  topItemBySales: Item[];
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name]
    }
  }
}
