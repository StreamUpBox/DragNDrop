import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'flipper-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
isAddingItem = false;
  constructor() {
    this.isAddingItem = localStorage.getItem('userIsCreatingAnItem') === '1' ? true : false;
  }

  ngOnInit() {
  }
  addItem() {
    this.isAddingItem = true;
    localStorage.setItem('userIsCreatingAnItem', '1');
  }
  didSaveItem(event) {
    if (event) {
      this.isAddingItem = false;
      localStorage.setItem('userIsCreatingAnItem', '0');
    }
  }
}
