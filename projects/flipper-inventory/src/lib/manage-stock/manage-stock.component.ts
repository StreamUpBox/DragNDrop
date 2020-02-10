import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Variant, Stock, ArrayRemoveItemPipe } from '@enexus/flipper-components';
import { StockService } from '../services/stock.service';

export class StockControl {
  id?: number;
  reason?: string;
  currentStock?: number;
  previousStock?: number;
  lowStock?:number;
  branchId?:number;
  canTrackingStock?:boolean;
  showlowStockAlert?:boolean;
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

  stockControl:StockControl[]=[];
  
  @Output() stockControlEmit = new EventEmitter < StockControl[] > ();

  constructor(public stock: StockService,
    private cd: ChangeDetectorRef,
    private removeArrayItem:ArrayRemoveItemPipe) { }

  ngOnInit() {
    this.stock.init();
    this.loadStocks();
  }
  loadStocks() {
    if (this.variation) {
      const stockControl:StockControl[]= this.stock.variantStocks(this.variation.id);
      if(stockControl.length > 0){
        stockControl.forEach(stock=>{
          const stockCtrl:StockControl={id:stock.id,reason:'',
          branchId:stock.branchId,currentStock:stock.currentStock,
          previousStock:stock.currentStock,
          lowStock:stock.lowStock,
          canTrackingStock:stock.canTrackingStock,
          showlowStockAlert:stock.showlowStockAlert
        };
          this.stockControl.push(stockCtrl);
        });
      }
    }
  }
  onSubmit() {
  }


  updateReason(stockControl: StockControl, event: any) {

      stockControl.reason=event.value;
      stockControl.currentStock=0;
      this.updateStockControl(stockControl);
      this.stockControlEmit.emit(this.stockControl);

  }
  updateInput(){
    this.stockControlEmit.emit(this.stockControl);
  }

  updateCurrentStock(stock: Stock, event: any) {

    const draft = this.stock.findDraftStockHistory(stock.variantId);

    if (draft) {
        draft.quantity = parseInt(event.target.value, 10);
        this.stock.updateHistory(draft);
      }
    this.balancingStock(stock, parseInt(event.target.value, 10));

  }

  balancingStock(stock: Stock, qty: number) {
    const draft = this.stock.findDraftStockHistory(stock.variantId);
    const previously = this.stock.findPreviouslyStockHistory(stock.variantId);
    if (this.stock.variantStocks(stock.variantId).length === 1) {
      stock.currentStock = qty;
      this.stock.update(stock);
    } else {
      if (previously && draft) {
        if (draft.reason === 'Received' || draft.reason === 'Restocked') {
          stock.currentStock = previously.quantity + qty;
        } else if (draft.reason === 'Re-counted') {
              stock.currentStock = qty;
        } else {
          stock.currentStock = previously.quantity <= 0 ? 0 : previously.quantity - qty;
        }
        this.stock.update(stock);
      }
    }


  }
  updateLowStock(stock: Stock, key: string, event: any) {
    stock[key] = event.target.value;
    this.stock.update(stock);
  }

  focusing(value: any) {
    this.isFocused = value;
  }
  focusingOut() {
    this.isFocused = '';
  }
  toggled(stockControl: StockControl, key: string, bol: boolean) {
    bol = !bol;
    stockControl[key] = bol;
    this.updateStockControl(stockControl);
    this.cd.detectChanges();
  }

  updateStockControl(stockControl:StockControl){
    const stockControls=this.stockControl;
    const arr:StockControl[]=[];
    this.stockControl=[];
          stockControls.forEach(sc=>{
            if(sc.id===stockControl.id){
              sc=stockControl;
            }
            arr.push(sc);
          });
          this.stockControl= arr;
  }
}
