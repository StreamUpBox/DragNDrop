import { Component, OnInit, Input } from '@angular/core';
import { VariationService } from '../../services/variation.service';
import { StockService } from '../../services/stock.service';
import {Product, CalculateTotalClassPipe } from '@enexus/flipper-components';
import { DialogService, DialogSize } from '@enexus/flipper-dialog';
import { AddVariantComponent } from '../add-variant/add-variant.component';

@Component({
  selector: 'flipper-regular-variants',
  templateUrl: './regular-variants.component.html',
  styleUrls: ['../../create-product/create-product.component.css',
               './regular-variants.component.css']
})
export class RegularVariantsComponent implements OnInit {
  isFocused = '';
  item: Product;

  @Input('product')
  set product(item: Product) {
  this.item = item;
  }
  get product(): Product {
  return this.item;
  }
  constructor(private dialog: DialogService, public variant: VariationService,
              public stock: StockService,
              private totalPipe: CalculateTotalClassPipe) { }

  async ngOnInit() {
    this.variant.activeBusiness();
   
  }
  refresh() {
    if (this.variant.hasRegular) {
     this.stock.variantStocks(this.variant.hasRegular.id);
      this.variant.request(null, this.variant.hasRegular);
    }
  }
  public openAddVariantDialog(product: Product): any {
    return this.dialog.open(AddVariantComponent, DialogSize.SIZE_MD, product).subscribe(result => {
      if (result === 'done') {
        this.variant.init(product);
      }
      this.variant.init(product);
    });
  }
  onSubmit() {

  }



  updateVariant(key: any, event: any) {

       this.variant. updateVariant(key, this.variant.hasRegular, event);
  }

  focusing(value) {
    this.isFocused = value;

    if (value === 'retailPrice') {
      this.variant.form.controls.retailPrice.setValue('');
    } else if (value === 'supplyPrice') {
      this.variant.form.controls.supplyPrice.setValue('');
    } else if (value === 'SKU') {
      this.variant.form.controls.SKU.setValue('');
    }
  }

   getTotalStock(variantId, key: any):number {
     this.stock.variantStocks(variantId);
    if (this.stock.stocks.length > 0) {
          return this.totalPipe.transform(this.stock.stocks, key);
    } else {
        return 0;
    }
  }

  async focusingOut() {

    await this.stock.findVariantStock(this.variant.hasRegular.id);
    const stock = this.stock.stock;

      if (this.isFocused === 'retailPrice' && (this.variant.form.controls.retailPrice.value === 0 ||
        this.variant.form.controls.retailPrice.value === '')) {
        this.variant.form.controls.retailPrice.setValue(stock.retailPrice ? stock.retailPrice : 0);
        }
      if (this.isFocused === 'supplyPrice' && (this.variant.form.controls.supplyPrice.value === 0 ||
        this.variant.form.controls.supplyPrice.value === '')) {
          this.variant.form.controls.supplyPrice.setValue(stock.supplyPrice ? stock.supplyPrice : 0);
        }

      if (this.isFocused === 'SKU' && (this.variant.form.controls.SKU.value === 0 ||
        this.variant.form.controls.SKU.value === '')) {
          this.variant.form.controls.SKU.setValue(this.variant.hasRegular.SKU);
        }


       this.isFocused = '';

  }



}
