import { Component, Input } from '@angular/core'
import { DashBoardEntries } from '@enexus/flipper-components'

@Component({
  selector: 'flipper-dashboard',
  templateUrl: './flipper-dashboard.component.html',
  styleUrls: ['./flipper-dashboard.component.css'],
})
export class FlipperDashboardComponent {
  @Input() dashboardEntries: DashBoardEntries = {}
  totalStores: any | null
  netProfits: any | null
  grossProfits: any | null
  totalRevenues: any | null
  topSoldItems: any[] | []
  lowStockItems: any[] | []

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
  get lowStockItem(): any {
    return this.lowStockItems
  }
  @Input() currency: string
}
