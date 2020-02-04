import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@enexus/flipper-components';
import { VariationService } from '../services/variation.service';

@Component({
  selector: 'flipper-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['../create-product/create-product.component.css']
})
export class VariantsComponent implements OnInit {
  @Input() product: Product;

  constructor(public variant: VariationService) {}

  ngOnInit() {

   if (this.product) {
    this.variant.init(this.product);
   }

  }

}
