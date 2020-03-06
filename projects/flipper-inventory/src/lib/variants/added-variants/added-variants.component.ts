import { Component, OnInit, Input } from '@angular/core';
import { VariationService } from '../../services/variation.service';
import { StockService } from '../../services/stock.service';
import { Product, Variant } from '@enexus/flipper-components';
import { DialogService, DialogSize } from '@enexus/flipper-dialog';
import { AddVariantComponent } from '../add-variant/add-variant.component';

@Component({
  selector: 'flipper-added-variants',
  templateUrl: './added-variants.component.html',
  styleUrls: ['../../create-product/create-product.component.css', './added-variants.component.css']
})
export class AddedVariantsComponent implements OnInit {
 item: Product;

  @Input('product')
set product(item: Product) {
this.item = item;
this.variant.init(item);
}
get product(): Product {
return this.item;
}

  constructor(private dialog: DialogService, public variant: VariationService, public stock: StockService) { }

  ngOnInit() {

  }

  convertInt(num) {
    return parseInt(num, 10);
  }

  public openAddVariantDialog(product: Product): any {
    return this.dialog.open(AddVariantComponent, DialogSize.SIZE_MD, product).subscribe(result => {
      if (result === 'done') {
        this.variant.init(product);
      }
    });
  }


  deleteProductVariation() {

    if (this.product) {
      this.variant.deleteProductVariations(this.product);
      this.variant.init(this.product);
    }

  }

  deleteVariation(variant: Variant) {
     if (this.product) {
      this.variant.deleteVariation(variant, this.product);
    }
  }
}
