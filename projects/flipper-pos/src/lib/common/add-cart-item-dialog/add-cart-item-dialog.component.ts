import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@enexus/flipper-components';

@Component({
  selector: 'flipper-add-cart-item-dialog',
  templateUrl: './add-cart-item-dialog.component.html',
  styleUrls: ['./add-cart-item-dialog.component.css']
})
export class AddCartItemDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddCartItemDialogComponent>, private formBuilder: FormBuilder,
              protected notificationSvc: NotificationService) {
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
    price: ['', Validators.required],
    name: 'Custom Amount',
    quantity: 1,
  });
}

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.form.invalid) {
    this.notificationSvc.error('Add Cart item', 'We need you to complete all of the required fields before we can continue');
    return;
  } else {
    this.dialogRef.close({price: this.form.value.price, quantity: this.form.value.quantity ? this.form.value.quantity
      : 1, name: this.form.value.name ? this.form.value.name : 'Custom Amount'});
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
