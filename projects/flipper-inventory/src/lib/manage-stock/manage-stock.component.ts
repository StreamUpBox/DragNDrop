import { Component, OnInit, Input } from '@angular/core';
import { Variant, Stock } from '@enexus/flipper-components';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'flipper-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['../create-product/create-product.component.css', './manage-stock.component.css']
})
export class ManageStockComponent implements OnInit {
  @Input() variation: Variant;
  isFocused = '';
  stocks: Stock[] = [];

  constructor(public stock: StockService) { }

  ngOnInit() {
    this.stock.init();
    this.loadStocks();
  }
  loadStocks() {
    if (this.variation) {
      this.stocks = this.stock.variantStocks<Stock>(this.variation.id);
    }
  }
  onSubmit() {
  }


  updateReason(stock: Stock, event: any) {


    const draft = this.stock.findDraftStockHistory(stock.variantId);
    const previously = this.stock.findPreviouslyStockHistory(stock.variantId);


    if (draft === undefined) {
      this.stock.createHistory({
       orderId: 0,
       variantId: stock.variantId,
       variantName: this.stock.findVariant(stock.variantId).name,
       stockId: stock.id,
       reason: event.value,
       quantity: 0,
       isDraft: true,
       isPreviously: !previously ? true : false,
       syncedOnline: false,
       note: event.value,
       createdAt: new Date(),
       updatedAt: new Date()
      });
    } else {
     draft.reason = event.value;
     draft.variantName = this.stock.findVariant(stock.variantId).name;
     this.stock.updateHistory(draft);
    }

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
  toggled(stock: Stock, key: string, bol: boolean) {
    bol = !bol;
    stock[key] = bol;
    this.stock.update(stock);
    this.loadStocks();
  }
}
