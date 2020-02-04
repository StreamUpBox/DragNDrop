import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInAnimation } from '@enexus/flipper-components';

@Component({
  selector: 'flipper-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('products', [
      transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))
    ]),
  ],
})
export class ProductsComponent implements OnInit {

  searching: string = null;
  set applySearch(value: string) {
    this.searching = value;
  }
  get applySearch(): string {
    return this.searching;
  }
 constructor(public product: ProductService) {}

  ngOnInit() {
    this.product.hasDraft();
    this.product.canAddProduct();
  }

  createProduct() {
        this.product.allowToAddProduct(true);
        this.product.create();
  }

  saveProductChange(event) {
    if (event) { this.product.allowToAddProduct(false); }
  }


}
