import { Component, OnInit } from '@angular/core'
import {
  DashBoardEntries,
  fadeInAnimation,
  Business,
  Stock,
  Branch,
  CalculateTotalClassPipe,
  RoundNumberPipe,
  Analytic,
  OrderDetails,
  PouchDBService,
  CurrentBusinessEvent,
} from '@enexus/flipper-components'
import { trigger, transition, useAnimation } from '@angular/animations'
import { HttpClient } from '@angular/common/http'
import { flipperUrl } from './constants'
import { FlipperEventBusService } from '@enexus/flipper-event'

import { APIService, } from '@enexus/api-services'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  animations: [
    trigger('insertDashboard', [transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))]),
  ],
})

export class DashboardComponent implements OnInit {
  dashboardEntries: DashBoardEntries

  public totalStore = 0.0
  public netProfit = 0.0
  public grossProfits = 0.0
  public totalRevenue = 0.0
  public topSoldItem = []
  public lowStockItem = []
  public defaultBusiness: Business = null
  public defaultBranch: Branch = null
  stocks: Stock[] = []
  public analytics: Analytic;
  totalCustomers: number =0
  newCustomers: number =0
  averageSpendingPerVisit: number =0
  averageVisitPerCustomer: number =0
  returningCustomers: number =0
  positiveFeedback: number =0
  negativeFeedback: number =0

  constructor(
    private api:APIService,
    private http: HttpClient,
    private totalPipe: CalculateTotalClassPipe,
    private eventBus: FlipperEventBusService,
    private database: PouchDBService
  ) {
    this.init()
  }

  async init() {
    this.currentBusiness()
    this.analytics = await this.api.getAnalytics();
    this.totalStore = this.analytics.storeValue
    this.totalCustomers = this.analytics.totalCustomers;
    this.newCustomers = this.analytics.newCustomers;
    this.averageSpendingPerVisit = this.analytics.averageSpendingPerVisit;
    this.averageVisitPerCustomer = this.analytics.averageVisitPerCustomer;
    this.returningCustomers = this.analytics.returningCustomers;
    this.positiveFeedback = this.analytics.positiveFeedback;
    this.negativeFeedback = this.analytics.negativeFeedback;
    this.netProfit = this.analytics.netProfit
    this.totalRevenue = this.analytics.totalRevenue
    this.grossProfits = this.analytics.grossProfit
    this.topSoldItem = []
    this.lowStockItem = []
  }

  ngOnInit() {
    this.init()
  }
  public async currentBusiness() {
    await this.http
      .get<Business>(flipperUrl + '/api/business')
      .toPromise()
      .then(business => {
        this.eventBus.publish(new CurrentBusinessEvent(business))
        this.defaultBusiness = business
      })
  }
  async currentBranches() {
    if (this.defaultBusiness) {
      this.defaultBranch = await this.getBranch()
    }
  }

  getBranch() {
    return this.database
      .query(['table', 'businessId'], {
        table: { $eq: 'branches' },
        businessId: { $eq: this.defaultBusiness.id },
      })
      .then(res => {
        if (res.docs && res.docs.length > 0) {
          return res.docs
        } else {
          return []
        }
      })
  }


  getLowStocks() {
    const lowStocks = []
    // const stocks: Stock[]=this.query.queries<Stock>(Tables.stocks, ` branchId="${this.branch.id}" AND canTrackingStock=true ORDER BY currentStock ASC`);
    // stocks.forEach((stock,i)=> {
    //   if(i < 6) {
    //     if(stock.lowStock && stock.currentStock < stock.lowStock) {
    //       const variant=this.model.find<Variant>(Tables.variants,stock.variantId);
    //       const product=this.model.find<Product>(Tables.products,variant.productId);
    //       lowStocks.push({
    //         id: stock.id,
    //         name: variant.name==='Regular'?product.name:variant.name,
    //         updatedAt: stock.updatedAt,
    //         currentStock: stock.currentStock
    //       });
    //     }
    //   }

    // });
    // return lowStocks;
  }
  loadOrderDetails(orderDetails: OrderDetails) {
    // const stock: Stock = this.model.find<Stock>(Tables.stocks, orderDetails.stockId);
    // if(stock){
    //   return { netProfit: orderDetails.subTotal-(orderDetails.quantity * stock.supplyPrice),
    //     grossProfit: (orderDetails.taxAmount+orderDetails.subTotal)-(orderDetails.quantity * stock.supplyPrice) };
    // }else{
    //   return  { netProfit: orderDetails.subTotal-(orderDetails.quantity * 0),
    //     grossProfit: (orderDetails.taxAmount+orderDetails.subTotal)-(orderDetails.quantity * 0) };
    // }
    return
  }

  topSoldsItem() {
    // const orderIds: Order[]=this.model.raw(`SELECT id
    // FROM orders WHERE branchId="${this.branch.id}"
    // ORDER BY updatedAt DESC LIMIT 5`) as Order[];
    // orderIds.forEach(d=> {
    //   ids.push(`'${d.id}'`);
    // });
    // return this.model.raw(`SELECT *
    //  FROM orderDetails WHERE  orderDetails.quantity > 0 AND orderId IN (${ids.join()}) ORDER BY updatedAt DESC LIMIT 5`);
  }
}
