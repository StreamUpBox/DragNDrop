import { Component, Input, ViewEncapsulation } from '@angular/core'
import { DashBoardEntries, Analytic } from '@enexus/flipper-components'
import { ChartType, ChartOptions, Chart } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'flipper-dashboard',
  templateUrl: './flipper-dashboard.component.html',
  styleUrls: ['./flipper-dashboard.component.css']
})
export class FlipperDashboardComponent {
  @Input() dashboardEntries: DashBoardEntries = {}

  constructor() {
    Chart.plugins.unregister(ChartDataLabels);
  }

  options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    showLines: false,
    spanGaps: false,
    plugins: {
      datalabels: {
        display: false,
      },
    }
  };

  // Doughnut
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [
    [1, 3, 5]
  ];
  public doughnutChartType: ChartType = 'doughnut';



  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  onSelect(event) { }

  totalStores: any | null
  netProfits: any | null
  grossProfits: any | null
  totalRevenues: any | null
  topSoldItems: any[] | []
  lowStockItems: any[] | []
  analytics: Analytic;

  @Input('totalStore')
  set totalStore(value: any) {
    this.totalStores = value
  }
  get totalStore(): any {
    return this.totalStores
  }
  // netProfit
  @Input('netProfit')
  set netProfit(value: any) {
    this.netProfits = value
  }
  get netProfit(): any {
    return this.netProfits
  }
  // grossProfit
  @Input('grossProfit')
  set grossProfit(value: any) {
    this.grossProfits = value
  }
  get grossProfit(): any {
    return this.grossProfits
  }

  // topSoldItem
  @Input('topSoldItem')
  set topSoldItem(value: any) {
    this.topSoldItems = value
  }
  get topSoldItem(): any {
    return this.topSoldItems
  }

  // totalRevenue
  @Input('totalRevenue')
  set totalRevenue(value: any) {
    this.totalRevenues = value
  }
  get totalRevenue(): any {
    return this.totalRevenues
  }

  // lowStockItem
  @Input('lowStockItem')
  set lowStockItem(value: any) {
    this.lowStockItems = value
  }

  @Input('analytics')
  set setAnalytics(value: any) {
    this.analytics = value
  }

  totalCustomers: number;
  @Input('totalCustomers')
  set setTotalCustomers(value: any) {
    this.totalCustomers = value;
  }
  // analytics: Analytic;

  newCustomers: number;
  @Input('newCustomers')
  set setnewCustomers(value: any) {
    this.newCustomers = value;
  }

  averageSpeningPerVisit: number;
  @Input('averageSpeningPerVisit')
  set seaverageSpeningPerVisit(value: any) {
    this.averageSpeningPerVisit = value;
  }

  averageVisitPerCustomer: number;
  @Input('averageVisitPerCustomer')
  set seaverageVisitPerCustomer(value: any) {
    this.averageVisitPerCustomer = value;
  }

  returningCustomers: number;
  @Input('returningCustomers')
  set sereturningCustomers(value: any) {
    this.returningCustomers = value;
  }

  positiveFeedback: number;
  @Input('positiveFeedback')
  set setpositiveFeedback(value: any) {
    this.positiveFeedback = value;
  }

  negativeFeedback: number;
  @Input('negativeFeedback')
  set snegativeFeedback(value: any) {
    this.negativeFeedback = value;
  }

  averageSpendingPerVisit: number;
  @Input('averageSpendingPerVisit')
  set seaverageSpendingPerVisit(value: any) {
    this.averageSpendingPerVisit = value;
  }
  get lowStockItem(): any {
    return this.lowStockItems
  }
  @Input() currency: string;
}
