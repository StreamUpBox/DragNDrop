import { Component, OnInit, Input, ChangeDetectionStrategy,
   ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Variant, Stock } from '@enexus/flipper-components';
import { StockService } from '../services/stock.service';

export class StockControl {
  id?: string;
  reason?: string;
  currentStock?: number;
  previousStock?: number;
  lowStock?: number;
  branchId?: number;
  canTrackingStock?: boolean;
  showLowStockAlert?: boolean;
}
@Component({
  selector: 'flipper-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['../create-product/create-product.component.css', './manage-stock.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageStockComponent implements OnInit {
  @Input() variation: Variant;
  isFocused = '';
  stocks: Stock[] = [];

  stockControl: StockControl[] = [];

  @Output() stockControlEmit = new EventEmitter < StockControl[] > ();

  constructor(public stock: StockService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.stock.init();
    this.loadStocks();
  }
  loadStocks() {
    if (this.variation) {
      const stockControl: StockControl[] = this.stock.variantStocks(this.variation.id);
      if (stockControl.length > 0) {
        stockControl.forEach(stock => {
          const stockCtrl: StockControl = {id: stock.id, reason: '',
          branchId: stock.branchId, currentStock: stock.currentStock,
          previousStock: stock.currentStock,
          lowStock: stock.lowStock,
          canTrackingStock: stock.canTrackingStock,
          showLowStockAlert: stock.showLowStockAlert
        };
          this.stockControl.push(stockCtrl);
        });
      }
    }
  }
  onSubmit() {
  }


  updateReason(stockControl: StockControl, event: any) {

      stockControl.reason = event.value;
      stockControl.currentStock = 0;
      this.updateStockControl(stockControl);
      this.stockControlEmit.emit(this.stockControl);

  }
  updateInput() {
    this.stockControlEmit.emit(this.stockControl);
  }


  focusing(value: any) {
    this.isFocused = value;
  }
  focusingOut() {
    this.isFocused = '';
  }


 
  updateStockControl(stockControl: StockControl) {
    const stockControls = this.stockControl;
    const arr: StockControl[] = [];
    this.stockControl = [];
    stockControls.forEach(sc => {
            if (sc.id === stockControl.id) {
              sc = stockControl;
            }
            arr.push(sc);
          });
    this.stockControl = arr;
  }
}
