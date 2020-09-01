import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@enexus/flipper-components';
import { VariationService } from '../services/variation.service';

@Component({
  selector: 'flipper-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['../create-product/create-product.component.css']
})
export class VariantsComponent implements OnInit {


products: Product;
@Input('product')
set product(bol: Product) {
this.products = bol;
}
get product(): Product {
return this.products;
}


addNew = false;

@Input('didAddNew')
set didAddNew(bol: boolean) {
this.addNew = bol;
}

get didAddNew(): boolean {
return this.addNew;
}
  constructor(public variant: VariationService) {}

  ngOnInit() {
       
      this.variant.init(this.product);
      
        
  }

 

}
