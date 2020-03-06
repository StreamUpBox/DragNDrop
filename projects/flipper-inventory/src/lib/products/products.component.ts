import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInAnimation } from '@enexus/flipper-components';
import { Router } from '@angular/router';

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
 constructor(private router: Router, public product: ProductService) {}

  ngOnInit() {
    this.product.hasDraft();
  }

  createProduct() {
     this.router.navigate(['/add/product']);
  }

}
