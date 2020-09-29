import { Component, OnInit, Inject, HostListener } from '@angular/core';

import { VariationService } from '../../services/variation.service';
import { NotificationService, Variant, Product, PouchDBService } from '@enexus/flipper-components';
import { StockService } from '../../services/stock.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'flipper-add-variant',
  templateUrl: './add-variant.component.html',
  styleUrls: ['../../create-product/create-product.component.css', './add-variant.component.css']
})
export class AddVariantComponent implements OnInit {
  constructor(private stock: StockService,
    protected notificationSvc: NotificationService,
    public variant: VariationService,
    public dialogRef: MatDialogRef<AddVariantComponent>,
    private database: PouchDBService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public product: Product) {
  }
  isFocused = '';
  submitted = false;
  form: FormGroup;
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Esc') {
      this.dialogRef.close();
    }

    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }
  get formControl() { return this.form.controls; }
  ngOnInit() {
     this.variant.currentBranches();
    this.variant.activeBusiness();
    this.form = this.formBuilder.group({
      name: [ '', Validators.required],
      SKU: this.variant.generateSKU(),
      retailPrice: [ 0.00, Validators.min(0)],
      supplyPrice: [0.00, Validators.min(0)],
      unit:'',
      createdAt: new Date(),
      updatedAt: new Date(),

    });
    console.log( this.variant.branches$);
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.notificationSvc.error('Create Business', 'We need you to complete all of the required fields before we can continue');
      return;
    }


    const formData: Variant = {
      id: this.database.uid(),
      name: this.form.value.name,
      productName: this.product.name,
      categoryName: '',
      productId: this.product.id,
      supplyPrice: parseInt(this.form.value.supplyPrice, 10),
      retailPrice: parseInt(this.form.value.retailPrice, 10),
      unit: this.form.value.unit,
      SKU: this.form.value.SKU ? this.form.value.SKU : this.variant.generateSKU(),
      syncedOnline: false,
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.variant.create(formData);
  
      this.variant.createVariantStock(formData);
    
    this.dialogRef.close('done');
  }


  focusing(value) {
    this.isFocused = value;

    if (value === 'retailPrice') {
      this.form.controls.retailPrice.setValue('');
    } else if (value === 'supplyPrice') {
      this.form.controls.supplyPrice.setValue('');
    } else if (value === 'SKU') {
      this.form.controls.SKU.setValue('');
    }
  }

  focusingOut() {
    if (this.isFocused === 'retailPrice' && (this.form.controls.retailPrice.value === 0 ||
      this.form.controls.retailPrice.value === '')) {
      this.form.controls.retailPrice.setValue(0);
    }
    if (this.isFocused === 'supplyPrice' && (this.form.controls.supplyPrice.value === 0 ||
      this.form.controls.supplyPrice.value === '')) {
      this.form.controls.supplyPrice.setValue(0);
    }

    if (this.isFocused === 'SKU' && (this.form.controls.SKU.value === 0 || this.form.controls.SKU.value === '')) {
      this.form.controls.SKU.setValue(this.variant.generateSKU());
    }


    this.isFocused = '';
  }

}
