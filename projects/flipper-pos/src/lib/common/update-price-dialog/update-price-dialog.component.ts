import { Component, OnInit, HostListener, Inject } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '@enexus/flipper-components';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'flipper-update-price-dialog',
  templateUrl: './update-price-dialog.component.html',
  styleUrls: ['./update-price-dialog.component.css']
})
export class UpdatePriceDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<UpdatePriceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public price: any, private formBuilder: FormBuilder,
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
      price: [!this.price ? this.price : 0.00, Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      this.notificationSvc.error('Add price', 'We need you to complete all of the required fields before we can continue');
      return;
    } else {
      this.dialogRef.close({ price: this.form.value.price });
    }

  }

  focusing(value: any) {
    this.isFocused = value;
    this.form.controls.price.setValue('');
  }
  focusingOut() {
    this.isFocused = '';
  }
}
