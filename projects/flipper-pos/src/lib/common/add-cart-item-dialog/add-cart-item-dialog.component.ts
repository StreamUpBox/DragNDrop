import { Component, OnInit, Inject, HostListener } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService, Taxes, MainModelService, Tables, Business, SettingsService } from '@enexus/flipper-components';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'flipper-add-cart-item-dialog',
  templateUrl: './add-cart-item-dialog.component.html',
  styleUrls: ['./add-cart-item-dialog.component.css']
})
export class AddCartItemDialogComponent implements OnInit {
  taxes$: Taxes[] = [];
  units: any[] = [];
  constructor(private model: MainModelService, public dialogRef: MatDialogRef<AddCartItemDialogComponent>,
    private formBuilder: FormBuilder,
    protected notificationSvc: NotificationService, private setting: SettingsService) {
    this.units = this.setting.units();
    this.taxes$ = this.model.filters<Taxes>(Tables.taxes, 'businessId',
      this.model.active<Business>(Tables.business).id);
  }

  get formControl() { return this.form.controls; }
  submitted = false;
  form: FormGroup;
  isFocused = '';

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Esc') {
      this.dialogRef.close('close');
    }

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      price: ['', Validators.required, Validators.min(0)],
      name: 'Custom Amount',
      quantity: [1, Validators.min(0)],
      tax: 0,
      unit: ''
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      this.notificationSvc.error('Add Cart item', 'We need you to complete all of the required fields before we can continue');
      return;
    } else {
      this.dialogRef.close({
        price: this.form.value.price, quantity: this.form.value.quantity
          && this.form.value.quantity > 0 ? this.form.value.quantity
          : 1, name: this.form.value.name ? this.form.value.name : 'Custom Amount',
        tax: this.form.value.tax ? this.form.value.tax : 0, unit: this.form.value.unit
      });
    }

  }

  focusing(value: any) {
    this.isFocused = value;
    if (value === 'name') {
      this.form.controls.name.setValue('');
    } else if (value === 'price') {
      this.form.controls.price.setValue('');
    } else if (value === 'quantity') {
      this.form.controls.quantity.setValue('');
    }
  }
  focusingOut() {
    this.isFocused = '';
  }
}
