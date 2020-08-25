import { Component, OnInit, Input } from '@angular/core';
import { Variant, Business } from '@enexus/flipper-components';
import { VariationService } from '../../services/variation.service';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'flipper-edit-variant',
  templateUrl: './edit-variant.component.html',
  styleUrls: ['../../create-product/create-product.component.css', './edit-variant.component.css']
})
export class EditVariantComponent implements OnInit {
  @Input() variation: Variant;
  isFocused = '';
  defaultBusiness:Business;
  constructor(public variant: VariationService, private stock: StockService) { }

  ngOnInit() {
    this.variant.activeBusiness();
    if (this.variation) {
      this.variant.request(null, this.variation);
    }

  }
  onSubmit() {
  }
  updateVariant(key: any, event: any) {

       this.variant. updateVariant(key, this.variation, event);

  }

  focusing(value) {
    this.isFocused = value;

    if (value === 'retailPrice') {
      this.variant.form.controls.retailPrice.setValue('');
    } else if (value === 'supplyPrice') {
      this.variant.form.controls.supplyPrice.setValue('');
    } else if (value === 'SKU') {
      this.variant.form.controls.SKU.setValue('');
    } else if (value === 'name') {
      this.variant.form.controls.name.setValue('');
    }
  }

      async focusingOut() {
        await this.stock.findVariantStock(this.variation.id);

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
              this.variant.form.controls.SKU.setValue(this.variation.SKU);
            }
          if (this.isFocused === 'name' && (this.variant.form.controls.name.value === 0 ||
            this.variant.form.controls.name.value === '')) {
              this.variant.form.controls.name.setValue(this.variation.name);
            }

          this.isFocused = '';
      }
}
