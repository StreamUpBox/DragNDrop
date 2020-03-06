import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VariationService } from '../../services/variation.service';
import { NotificationService, Variant, Product } from '@enexus/flipper-components';
import { StockService } from '../../services/stock.service';

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
              @Inject(MAT_DIALOG_DATA) public product: Product) {
}
  isFocused = '';
  submitted = false;

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Esc') {
      this.dialogRef.close();
    }

    if (event.key === 'Enter') {
        this.onSubmit();
    }
  }

  ngOnInit() {
    this.variant.request('add');
  }
  onSubmit() {
    this.submitted = true;
    if (this.variant.form.invalid) {
      this.notificationSvc.error('Create Business', 'We need you to complete all of the required fields before we can continue');
      return;
    }

    const formData: Variant = {
      name: this.variant.form.value.name,
      productName: this.product.name,
      categoryName: '',
      productId: this.product.id,
      supplyPrice: parseInt(this.variant.form.value.supplyPrice, 10),
      retailPrice: parseInt(this.variant.form.value.retailPrice, 10),
      unit: this.variant.form.value.unit,
      SKU: this.variant.form.value.SKU ? this.variant.form.value.SKU : this.variant.generateSKU(this.product.id),
      syncedOnline: false,
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.variant.create(formData);
    const lastCreated = this.variant.findFirst(this.product.id);
    if (lastCreated) {
       this.variant.createVariantStock(lastCreated.id);
       this.updateStock(lastCreated.id, formData);
    }
    this.dialogRef.close('done');
  }

  updateStock(variantId: number, formData) {
    const myStock = this.stock.findStock(variantId);
    if (myStock) {
      myStock.supplyPrice = formData.supplyPrice;
      myStock.retailPrice = formData.retailPrice;
      this.stock.update(myStock);
    }

  }


  focusing(value) {
    this.isFocused = value;

    if (value === 'retailPrice') {
      this.variant.form.controls.retailPrice.setValue('');
    } else if (value === 'supplyPrice') {
      this.variant.form.controls.supplyPrice.setValue('');
    } else if (value === 'SKU') {
      this.variant.form.controls.SKU.setValue('');
    }
  }

  focusingOut() {
      if(this.isFocused==='retailPrice' && (this.variant.form.controls.retailPrice.value===0 || this.variant.form.controls.retailPrice.value==='')){
      this.variant.form.controls.retailPrice.setValue(0);
      }
      if(this.isFocused==='supplyPrice' && (this.variant.form.controls.supplyPrice.value==0 || this.variant.form.controls.supplyPrice.value=='')){
        this.variant.form.controls.supplyPrice.setValue(0);
      }
  
      if(this.isFocused==='SKU' && (this.variant.form.controls.SKU.value===0 || this.variant.form.controls.SKU.value==='')){
        this.variant.form.controls.SKU.setValue(this.variant.generateSKU(this.product.id));
      }
      
  
      this.isFocused = '';
    }

}
