import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationService} from '@enexus/flipper-components';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'flipper-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  isFocused = '';
  @Output() savedItem: any = new EventEmitter<boolean>();

  submitted = false;


  constructor(public product: ProductService, protected notificationSvc: NotificationService) {}

  ngOnInit() {
    this.product.hasDraft();

    this.product.init();
    this.product.request();

  }


  updateItem(key, event) {
    let val = '';
    if (key === 'taxId') {
          val = event.value;
      } else {
          val = event.target.value;
      }
    this.product.updateKeyValue(key, val);
    this.product.update();
  }






  onSubmit() {
    this.submitted = true;
    if (this.product.form.invalid) {
      this.notificationSvc.error('Create an item', 'Please enter a name for your item.');
      return;
    }
    this.product.saveProduct();
  }

  viewImageUploaded(src) {
    this.product.hasDraftProduct.picture = src;
    this.product.update();
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

}
