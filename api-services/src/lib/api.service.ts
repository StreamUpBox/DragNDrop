import { Injectable, InjectionToken } from '@angular/core';
import { Variant,Analytic } from '@enexus/flipper-components';
// This injection token can be used to configure the Providers as well as the @Inject()
// meta-data that will tell the dependency-injection container how to locate the desired
// class instance.
//
var ApiToken = new InjectionToken<ApiInterface>("api");
interface ApiInterface {
  getAnalytics(): Promise<Analytic>;
  searchQuery(key:string):Promise<Variant[]|any[]>;
}

@Injectable({
  providedIn: 'root'
})
export class APIService implements ApiInterface {
  searchResult:Variant[] =[];
  searchQuery(key:string): Promise<Variant[]|any[]> {
    this.searchResult = []; // make sure to start a search by emptying the value of []
    this.searchResult.push(new Variant({
      "id": "a2bc4d30-7056-4cc5-b1a8-7bf67b2fa4e0",
      "name": "Regular",
      "sku": "sku",
      "productId": "0f9d01f1-bcfd-493d-9076-5e92615dd4d7",
      "unit": "kg",
      "retailPrice":400,
      "supplyPrice":200,
      "table": "variants",
      "channels": [
          "54"
      ],
      "productName": "Mango" //this from API does not return have to fix it.
  }));
    return   new Promise<Variant[]>((resolve, reject) => {
      setTimeout( () => {
          resolve(this.searchResult);
      }, 500);
  } );
  }
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
