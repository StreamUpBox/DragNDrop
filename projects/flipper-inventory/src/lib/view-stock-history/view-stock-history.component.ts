import { Component, OnInit, HostListener, Inject, ViewChild, OnDestroy } from '@angular/core'

import { Subscription } from 'rxjs'
import { StockHistory, Variant } from '@enexus/flipper-components'
import { StockHistoryService } from './stock-history.service'
import { FormControl } from '@angular/forms'

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'flipper-view-stock-history',
  templateUrl: './view-stock-history.component.html',
  styleUrls: ['./view-stock-history.component.css'],
})
export class ViewStockHistoryComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<ViewStockHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public stockHsSvc: StockHistoryService
  ) {
    this.dataSource = new MatTableDataSource([])
  }

  set loadAllStockHistory(variants: StockHistory[]) {
    this.dataSource = new MatTableDataSource(variants)
    this.dataSource.sort = this.sort

    this.dataSource.paginator = this.paginator

    this.loading = false
  }

  readonly displayedColumns: string[] = ['createdAt', 'variation', 'adjustment', 'note']

  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  private subscription: Subscription
  loading = true
  dataSource: MatTableDataSource<StockHistory>
  variantList = new FormControl()

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Esc') {
      this.dialogRef.close('done')
    }

    if (event.key === 'Enter') {
      this.dialogRef.close('done')
    }
  }
  ngOnInit() {
    this.refresh()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  async refresh() {
    this.loading = true
    if (this.data.variant.id) {
      await this.stockHsSvc.loadAllStockHistories(this.data.variant.id)
      this.loadAllStockHistory = await this.stockHsSvc.stockHistories
    }
  }
}
