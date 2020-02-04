import { Component, OnInit, Input } from '@angular/core';
import { VariationService } from '../../services/variation.service';
import { StockService } from '../../services/stock.service';
import {Product } from '@enexus/flipper-components';

@Component({
  selector: 'flipper-regular-variants',
  templateUrl: './regular-variants.component.html',
  styleUrls: ['../../create-product/create-product.component.css',
               './regular-variants.component.css']
})
export class RegularVariantsComponent implements OnInit {
  isFocused = '';
  @Input() product: Product;
  constructor(public variant: VariationService, public stock: StockService) { }

  ngOnInit() {
    if (this.variant.hasRegular) {
      this.variant.request(null, this.variant.hasRegular);
    }

  }
  onSubmit() {

  }



  updateVariant(key: any, event: any) {

       this.variant. updateVariant(key, this.variant.hasRegular, event);
  }

  focusing(value) {
    this.isFocused = value;
  }
  focusingOut() {
    this.isFocused = '';
  }


}
