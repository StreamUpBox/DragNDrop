import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainModelService, NotificationService, Branch, Taxes, Product, Tables, Business } from '@enexus/flipper-components';
import { Observable } from 'rxjs';

@Component({
  selector: 'flipper-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  isFocused = '';
  @Output() savedItem: any = new EventEmitter<boolean>();
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  registerForm: FormGroup;
  submitted = false;
  branches$: Observable<Branch[]>;
  taxes$: Observable<Taxes[]>;
  hasDraftProduct:Product =null;

  constructor(private router: Router, protected notificationSvc: NotificationService,
    private formBuilder: FormBuilder, private model: MainModelService) {
}

ngOnInit() {
  this.hasDraftProduct = this.model.filters<Product>(Tables.products,['isDraft'],true as any)[0];
  if(!this.hasDraftProduct){
    this.model.create<Product>(Tables.products,
      {
        name:'new item',
        businessId:this.model.active<Business>(Tables.business).id,
        isDraft:true,
        active:false,
        isCurrentUpdate:false,
        createdAt:new Date(),
        updatedAt:new Date()
      }
    );
  }
 
  this.branches$ = this.model.loadAll<Branch>(Tables.branch);

  this.registerForm = this.formBuilder.group({
    name: [this.hasDraftProduct.name=='new item'?'':this.hasDraftProduct.name, Validators.required],
    categoryId: this.hasDraftProduct.categoryId,
    description: this.hasDraftProduct.description,
    picture: this.hasDraftProduct.picture,
    taxId: this.hasDraftProduct.taxId,
    supplierId:this.hasDraftProduct.supplierId,
    createdAt:new Date(),
    updatedAt:new Date(),

  }
  );
 
}


get f() { return this.registerForm.controls; }

onSubmit() {
  this.submitted = true;

  if (this.registerForm.invalid) {
    this.notificationSvc.error('Create an item', 'Please enter a name for your item.');
    return;
  }
}

  viewImageUploaded(src){
    console.log(src);
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
