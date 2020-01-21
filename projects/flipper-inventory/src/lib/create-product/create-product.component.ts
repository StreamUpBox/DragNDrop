import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'flipper-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  isFocused = '';
  @Output() savedItem: any = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {

  }
  focusing(value) {
    this.isFocused = value;
  }
  focusingOut() {
    this.isFocused = '';
  }
  save() {
    this.savedItem.emit(true);
  }
  discard() {
    this.savedItem.emit(true);
  }
}
