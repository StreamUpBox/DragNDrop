import { Component, OnInit } from '@angular/core';
import { MainModelService, Product, Tables, Business } from '@enexus/flipper-components';

@Component({
  selector: 'flipper-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
isAddingItem = false;
  hasDraftProduct: Product = null;
  constructor(private model: MainModelService) {
    this.isAddingItem = localStorage.getItem('userIsCreatingAnItem') === '1' ? true : false;
  }

  ngOnInit() {
  }
  addItem() {
    this.isAddingItem = true;
    localStorage.setItem('userIsCreatingAnItem', '1');
    this.hasDraftProduct = this.model.filters<Product>(Tables.products, ['isDraft'], true as any)[0];
    if (!this.hasDraftProduct) {
        this.model.create<Product>(Tables.products,
          {
            name: 'new item',
            businessId: this.model.active<Business>(Tables.business).id,
            isDraft: true,
            active: false,
            isCurrentUpdate: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        );
      }

  }
  didSaveItem(event) {
    if (event) {
      this.isAddingItem = false;
      localStorage.setItem('userIsCreatingAnItem', '0');
    }
  }
}
