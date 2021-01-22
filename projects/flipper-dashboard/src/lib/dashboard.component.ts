import { Component, OnInit } from '@angular/core'
import {
  DashBoardEntries,
  fadeInAnimation,
  Business,
  Stock,
  Branch,
  CalculateTotalClassPipe,
  RoundNumberPipe,
  OrderDetails,
  PouchDBService,
  CurrentBusinessEvent,
} from '@enexus/flipper-components'
import { trigger, transition, useAnimation } from '@angular/animations'
import { HttpClient } from '@angular/common/http'
import { flipperUrl } from './constants'
import { FlipperEventBusService } from '@enexus/flipper-event'

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
  private branch: Branch
  public topSoldItem = []
  public lowStockItem = []
  public defaultBusiness: Business = null
  public defaultBranch: Branch = null
  stocks: Stock[] = []
  // public currency = this.model.active<Business>(Tables.business) ? this.model.active<Business>(Tables.business).currency : 'RWF';
  constructor(
    private http: HttpClient,
    private totalPipe: CalculateTotalClassPipe,
    private eventBus: FlipperEventBusService,
    // private currentUser: CurrentUser,
    private radomNumberPipe: RoundNumberPipe,
    // private query: ModelService,
    private database: PouchDBService
  ) {
    // FIXME:
    this.branch = null
    this.totalStore = 200.0 //this.getStockValue();
    this.netProfit = 230.0 //this.getNetProfit();
    this.totalRevenue = 300.0 // this.getTotalRevenues();
    this.grossProfits = 20.0 //this.getGrossProfit();
    this.topSoldItem = [] // this.topSoldItems();
    this.lowStockItem = [] // this.getLowStocks();
  }

  async init() {
    // await this.allStocks()
    this.currentBusiness()
  }

  ngOnInit() {
    this.init()
  }
  async theStocks() {
    // this.stocks = await this.allStocks()
  }
  allStocks() {
    // if (this.currentUser.currentBranch) {
    //   console.log('hhh')
    //   return this.database
    //     .query(['table'], {
    //       table: { $eq: 'stocks' },
    //       // branchId: { $eq: this.currentUser.currentBranch.id }
    //     })
    //     .then(res => {
    //       console.log(res)
    //       if (res.docs && res.docs.length > 0) {
    //         return res.docs
    //       } else {
    //         return []
    //       }
    //     })
    // }
  }

  public async currentBusiness() {
    await this.http
      .get<Business>(flipperUrl + '/api/business')
      .toPromise()
      .then(business => {
        this.eventBus.publish(new CurrentBusinessEvent(business))
        this.defaultBusiness = business
        console.log('got a business here', this.defaultBusiness)
      })
  }
  async currentBranches() {
    if (this.defaultBusiness) {
      console.log('imbeba')
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

  topSoldItems() {
    const topSolds = []
    // if(this.topSoldsItem().length > 0) {
    //   this.topSoldsItem().forEach((item: OrderDetails,i)=> {

    //     if(item.quantity) {
    //       const x= {
    //         id: i+1,
    //         name: item.variantName,
    //         updatedAt: 'Updated 5m ago',
    //         items: item.quantity,
    //         total: item.subTotal
    //       };
    //       topSolds.push(x);
    //     }

    //   });
    // }

    return topSolds
  }

  getStockValue() {
    return this.radomNumberPipe.transform(this.stockValue())
  }
  stockValue() {
    const stocks: Stock[] = []
    const results = [{ retailPrice: 0 }]

    if (stocks.length > 0) {
      stocks.forEach(result => {
        results.push({ retailPrice: result.currentStock * result.retailPrice })
      })
    }

    return this.totalPipe.transform(results, 'retailPrice')
  }
  grossProfit() {
    const stocks = this.getSaleStocks()
    return this.totalPipe.transform(stocks, 'grossProfit')
  }

  getGrossProfit() {
    return this.radomNumberPipe.transform(this.grossProfit())
  }

  getNetProfit() {
    const stocks = this.getSaleStocks()
    return this.radomNumberPipe.transform(this.totalPipe.transform(stocks, 'netProfit'))
  }

  totalRevenues() {
    // const sales: Order[] = this.sales()
    // return this.totalPipe.transform(sales, 'saleTotal')
  }
  getTotalRevenues() {
    // return this.radomNumberPipe.transform(this.totalRevenues())
  }

  sales() {
    // TODO: completed order API
    // return this.query.queries<Order>(
    //   Tables.order,
    //   ` branchId="${this.branch.id}" AND orderType='sales' AND status='complete'`
    // )
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

  getSaleStocks() {
    let stocks = [{ netProfit: 0, grossProfit: 0 }]
    // if (this.loadSales().length > 0) {
    //     stocks=[];
    //     this.loadSales().forEach(orderDetails => {
    //       if (orderDetails && orderDetails.stockId) {

    // stocks.push(this.loadOrderDetails(orderDetails));
    //     }
    //   });
    // }
    return stocks
  }

  loadSales() {
    const orderItems: OrderDetails[] = []
    // const details: OrderDetails[]= this.model.loadAll<OrderDetails>(Tables.orderDetails);
    // this.sales().forEach(sale => {
    //   if (sale) {
    //     details.forEach(d=> {
    //       if((!orderItems.find(dd=>dd.id===d.id)) && d.orderId===sale.id) {
    //         orderItems.push(d);
    //       }
    //     });
    //   }
    // });
    return orderItems
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
