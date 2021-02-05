import { Component, OnInit, Inject, HostListener } from '@angular/core'

import { VariationService } from '../../services/variation.service'
import { NotificationService, Variant, Product, PouchDBService, PouchConfig } from '@enexus/flipper-components'
import { StockService } from '../../services/stock.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormGroup, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'flipper-add-variant',
  templateUrl: './add-variant.component.html',
  styleUrls: ['../../create-product/create.scss', './add-variant.component.css'],
})
export class AddVariantComponent implements OnInit {
  constructor(
    protected notificationSvc: NotificationService,
    public variant: VariationService,
    public dialogRef: MatDialogRef<AddVariantComponent>,
    private database: PouchDBService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  isFocused = ''
  submitted = false
  form: FormGroup
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Esc') {
      this.dialogRef.close()
    }

    if (event.key === 'Enter') {
      this.onSubmit()
    }
  }
  get formControl() {
    return this.form.controls
  }
  ngOnInit() {
    // this.variant.activeBusiness();
    this.form = this.formBuilder.group({
      name: [ '', Validators.required],
      sku: this.variant.generateSKU(),
      retailPrice: [ 0.00, Validators.min(0)],
      supplyPrice: [0.00, Validators.min(0)],
      unit:'',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }
  async onSubmit() {
    await this.variant.currentBranches()
    this.submitted = true
    this.dialogRef.close('done')
    if (this.form.invalid) {
      this.notificationSvc.error(
        'Create Business',
        'We need you to complete all of the required fields before we can continue'
      )
      return
    }

    // console.log('here ganza',this.variant.branches$);

    const formData: Variant = {
      id: this.database.uid(),
      name: this.form.value.name,
      productName: this.data.product.name,
      categoryName: '',
      productId: this.data.product.id,
      supplyPrice: parseInt(this.form.value.supplyPrice, 10),
      retailPrice: parseInt(this.form.value.retailPrice, 10),
      unit: this.form.value.unit,
      sku: this.form.value.sku ? this.form.value.sku : this.variant.generateSKU(),
      syncedOnline: false,
      isActive: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      channels: [localStorage.getItem('userId')],
      userId: localStorage.getItem('userId'),
      table: 'variants',
    }

    await this.database.put(PouchConfig.Tables.variants + '_' + formData.id, formData)

    this.variant.createVariantStock(formData, this.variant.branches$)

    return this.dialogRef.close('done')
  }

  focusing(value) {
    this.isFocused = value

    if (value === 'retailPrice') {
      this.form.controls.retailPrice.setValue('')
    } else if (value === 'supplyPrice') {
      this.form.controls.supplyPrice.setValue('');
    } else if (value === 'sku') {
      this.form.controls.sku.setValue('');
    }
  }

  focusingOut() {
    if (
      this.isFocused === 'retailPrice' &&
      (this.form.controls.retailPrice.value === 0 || this.form.controls.retailPrice.value === '')
    ) {
      this.form.controls.retailPrice.setValue(0)
    }
    if (
      this.isFocused === 'supplyPrice' &&
      (this.form.controls.supplyPrice.value === 0 || this.form.controls.supplyPrice.value === '')
    ) {
      this.form.controls.supplyPrice.setValue(0)
    }

    if (this.isFocused === 'sku' && (this.form.controls.sku.value === 0 || this.form.controls.sku.value === '')) {
      this.form.controls.sku.setValue(this.variant.generateSKU());
    }

    this.isFocused = ''
  }
}
