import { Component, OnInit, Input } from '@angular/core';
import { Variant } from '@enexus/flipper-components';
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
  constructor(public variant: VariationService, private stock: StockService) { }

  ngOnInit() {
    if (this.variation) {
      this.variant.request(null, this.variation);
    }

  }
  onSubmit() {
  }
  updateVariant(key: any, event: any) {

       this.variant. updateVariant(key, this.variation, event);

  }

  focusing(value: any) {
    this.isFocused = value;
  }
  focusingOut() {
    this.isFocused = '';
  }
}
