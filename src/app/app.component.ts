import {
  Component
} from '@angular/core';
import { Schema, ModelService } from '@enexus/flipper-offline-database';
import {
  MainModelService, Order, Tables, Branch, STATUS, ORDERTYPE,
  Variant, Stock, Product, OrderDetails,
  CalculateTotalClassPipe, StockHistory, Business, RoundNumberPipe, DashBoardEntries
} from '@enexus/flipper-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  public branch: Branch | null;
  public totalStore: number = 0.00;
  public netProfit: number = 0.00;
  public grossProfits: number = 0.00;
  public totalRevenue: number = 0.00;

  public topSoldItem = [];
  public lowStockItem=[];
  public currency = this.model.active<Business>(Tables.business) ? this.model.active<Business>(Tables.business).currency : 'RWF';
  constructor(private totalPipe: CalculateTotalClassPipe,
    private radomNumberPipe: RoundNumberPipe,
    private query: ModelService, private model: MainModelService) {
    this.branch = this.model.active<Branch>(Tables.branch);
    this.totalStore = this.getStockValue();
    this.netProfit = this.getNetProfit();
    this.totalRevenue = this.getGrossProfit();
    this.grossProfits = this.getGrossProfit();
    this.topSoldItem = this.topSoldItems();
   
    
    this.lowStockItem = this.lowStockItems();

  }

  ngOnInit(): void {
    this.totalRevenue = this.getGrossProfit();
    this.totalStore = this.getStockValue();
    this.netProfit = this.getNetProfit();
    this.grossProfits = this.getGrossProfit();
    this.lowStockItem = this.lowStockItems();

  }

  ngAfterViewInit(): void {
    this.totalRevenue = this.getGrossProfit();
    this.totalStore = this.getStockValue();
    this.netProfit = this.getNetProfit();
    this.grossProfits = this.getGrossProfit();
    this.lowStockItem = this.lowStockItems();
  }
  lowStockItems() {
    const lowStocks = [{
      id: 1,
      name: 'Kimirongo',
      updatedAt: new Date(),
      currentStock: 4
    },
    {
      id: 2,
      name: 'Kicukiro',
      updatedAt: new Date(),
      currentStock: 4
    },
    {
      id: 3,
      name: 'Nyagatare',
      updatedAt: new Date(),
      currentStock: 4
    },
    {
      id: 4,
      name: 'Gicumbi',
      updatedAt: new Date(),
      currentStock: 10,
    },
    {
      id: 5,
      name: 'Gicumbi',
      updatedAt: new Date(),
      currentStock: 10,
    }
    ];
    return lowStocks;
  }

  topSoldItems() {
    const soldItems = [{
      id: 1,
      name: 'Mineral Water',
      updatedAt: 'Updated 5m ago',
      items: 100,
      total: 5000
    },
    {
      id: 2,
      name: 'Salt',
      updatedAt: 'Updated 5m ago',
      items: 100,
      total: 5000
    },
    {
      id: 3,
      name: 'Vinegar',
      updatedAt: 'Updated 5m ago',
      items: 100,
      total: 5000
    },
    {
      id: 4,
      name: 'Blueband',
      updatedAt: 'Updated 5m ago',
      items: 100,
      total: 5000
    },{
      id: 5,
      name: 'Blueband',
      updatedAt: 'Updated 5m ago',
      items: 100,
      total: 5000
    }
    ];
    return soldItems;
  }


  getStockValue() {
    return this.radomNumberPipe.transform(this.stockValue());
  }
  stockValue() {
    const stocks: Stock[] = this.stocks();
    const results = [{ retailPrice: 0 }];

    if (stocks.length > 0) {
      stocks.forEach(result => {
        results.push({ retailPrice: result.currentStock * result.retailPrice });
      });
    }

    return this.totalPipe.transform(results, 'retailPrice');

  }
  grossProfit() {
    const stocks = this.getSaleStocks();
    return this.totalPipe.transform(stocks, 'retailPrice');
  }

  getGrossProfit() {
    return this.radomNumberPipe.transform(this.grossProfit());
  }


  getNetProfit() {
    return this.radomNumberPipe.transform(this.grossProfit() - this.salesStockCostPrice());
  }

  salesStockCostPrice() {
    const stocks = this.getSaleStocks();
    return this.totalPipe.transform(stocks, 'supplyPrice');
  }

  stocks() {
    return this.query.queries<Stock>(Tables.stocks, ` branchId=${this.branch.id} AND currentStock > 0 AND canTrackingStock=true`);
  }

  sales() {
    return this.query.queries<Order>(Tables.order, ` branchId=${this.branch.id} AND orderType='sales' AND status='complete'`);
  }

  getSaleStocks() {
    const stocks = [{ retailPrice: 0, supplyPrice: 0 }];
    this.sales().forEach(sale => {
      if (sale) {
        if (this.loadOrderDetails(sale.id).length > 0) {
          this.loadOrderDetails(sale.id).forEach(orderDetails => {
            if (orderDetails.canTrackStock && orderDetails.stockId > 0) {
              const stock: Stock = this.model.find<Stock>(Tables.stocks, orderDetails.stockId);
              stocks.push({ retailPrice: orderDetails.quantity * stock.retailPrice, supplyPrice: orderDetails.quantity * stock.supplyPrice });
            }
          });
        }
      }
    });
    return stocks;
  }

  loadOrderDetails(orderId: number) {
    return this.model.filters<OrderDetails>(Tables.orderDetails, 'orderId', orderId);
  }
}
