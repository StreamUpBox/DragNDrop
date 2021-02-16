// import { Variant } from './../../../../../flipper-components/src/lib/entries/variant';
import { Component, OnInit, HostListener, Inject } from '@angular/core'

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NotificationService, Taxes, SettingsService, Product, Variant } from '@enexus/flipper-components'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
// import { SearchedItemEvent } from '@enexus/flipper-pos'
import { FlipperEventBusService } from '@enexus/flipper-event'
import { SearchedItemEvent } from '../../search-item-event'
import { HttpClient } from '@angular/common/http'
import { flipperUrl } from '../../constants'
import * as Sentry from "@sentry/angular";
@Component({
  selector: 'flipper-add-cart-item-dialog',
  templateUrl: './add-cart-item-dialog.component.html',
  styleUrls: ['./add-cart-item-dialog.component.css'],
})
export class AddCartItemDialogComponent implements OnInit {
  units: any[] = []

  constructor(
    public dialogRef: MatDialogRef<AddCartItemDialogComponent>,
    private eventBus: FlipperEventBusService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    protected notificationSvc: NotificationService,
    private setting: SettingsService,
    @Inject(MAT_DIALOG_DATA) public taxes$: Taxes[]
  ) {
    this.units = this.setting.units()
  }

  get formControl() {
    return this.form.controls
  }
  submitted = false
  form: FormGroup
  isFocused = ''

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Esc') {
      this.dialogRef.close('close')
    }
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      price: [100, Validators.required],
      name: 'Custom Amount',
      quantity: [1, Validators.min(1)],
      tax: null,
      unit: '',
    })
  }

  onSubmit() {
    this.submitted = true
    this.http.post(flipperUrl + '/api/product', {
      "name": "Custom Amount",
      "description": "Custom Amount",
      "active": true,
      "hasPicture": false,
      "isImageLocal": false,
      "table": "products",
      "isDraft": false,
      "color": "CCCC",
      "isCurrentUpdate": false,
      "supplierId": "XXX",
      "categoryId": "XXX",
      "createdAt": new Date().toISOString(),
      "unit": "item",
      "variants": [
        {
          "name": "Regular",
          "sku": "sku",
          "unit": "kg",
          "table": "variants"
        }
      ]
    })
      .toPromise()
      .then((product: Product) => {
        this.http.get<Variant[]>(flipperUrl + '/api/variants/' + product.id)
          .toPromise()
          .then((variants: Variant[]) => {
            //emit this array of variant back to the searched item so it can be added to the list i.e cart
            this.eventBus.publish(new SearchedItemEvent(variants))
          }).catch((error: any) => {
            Sentry.captureException(error);
          })
      }).catch((error: any) => {
        Sentry.captureException(error);
      })
  }

  focusing(value: any) {
    this.isFocused = value
    // if (value === 'name') {
    //   this.form.controls.name.setValue('')
    // } else if (value === 'price') {
    //   this.form.controls.price.setValue('')
    // } else if (value === 'quantity') {
    //   this.form.controls.quantity.setValue('')
    // }
  }
  focusingOut() {
    this.isFocused = ''
  }
}
