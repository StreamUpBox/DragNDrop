import { Component, OnInit, Input } from '@angular/core';
import { VariationService } from '../../services/variation.service';
import { StockService } from '../../services/stock.service';
import { Product, Variant } from '@enexus/flipper-components';

@Component({
  selector: 'flipper-added-variants',
  templateUrl: './added-variants.component.html',
  styleUrls: ['../../create-product/create-product.component.css', './added-variants.component.css']
})
export class AddedVariantsComponent implements OnInit {
  @Input() product: Product;
  constructor(public variant: VariationService, public stock: StockService) { }

  ngOnInit() {

  }

  convertInt(num) {
    return parseInt(num, 10);
  }


  deleteProductVariation() {

    if (this.product) {
      this.variant.deleteProductVariations(this.product);
      this.variant.init(this.product);
    }

  }

  deleteVariation(variant: Variant) {
     if (this.product) {
      this.variant.deleteVariation(variant);
      this.variant.init(this.product);
    }
  }
}
