import { Injectable, InjectionToken } from '@angular/core';

// This injection token can be used to configure the Providers as well as the @Inject()
// meta-data that will tell the dependency-injection container how to locate the desired
// class instance.
var ApiToken = new InjectionToken<ApiInterface>("api");

export class Analytic {
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
interface ApiInterface {
  getAnalytics(): Promise<Analytic>;
}


@Injectable({
  providedIn: 'root'
})
export class APIService implements ApiInterface {
  async getAnalytics(): Promise<Analytic> {
    const grossP = Math.floor(Math.random() * 80000) + 9000;
    const totalR = Math.floor(Math.random() * 40000) + 8000;
    return new Analytic({
      totalRevenue: totalR, totalTransactions: 800, storeValue: 650, grossProfit: grossP, netProfit: (grossP - totalR),
      totalCustomers:20,
      newCustomers:30,
      averageSpendingPerVisit:3400,
      averageVisitPerCustomer:4,
      returningCustomers:14,
      positiveFeedback:21,
      negativeFeedback:3,
      topItemBySales: [
        {
          name: "Ibirayi",
          count: Math.floor(Math.random() * 2) + 9,
          totalAmount: Math.floor(Math.random() * 1) + 10 * 350
        },
        {
          name: "Mango",
          count: Math.floor(Math.random() * 5) + 8,
          totalAmount: Math.floor(Math.random() * 1) + 10 * 450
        }
      ]
    })
  }

}
