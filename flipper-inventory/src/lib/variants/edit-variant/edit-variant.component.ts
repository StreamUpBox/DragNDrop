import { Component, OnInit, Input } from '@angular/core'
import { Variant, Business, Stock } from '@enexus/flipper-components'
import { VariationService } from '../../services/variation.service'
import { StockService } from '../../services/stock.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'flipper-edit-variant',
  templateUrl: './edit-variant.component.html',
  styleUrls: ['../../create-product/create.scss', './edit-variant.component.css'],
})
export class EditVariantComponent implements OnInit {
  @Input() variation: Variant
  @Input() stock: Stock
  @Input() currency: string = 'RWF'
  isFocused = ''
  defaultBusiness: Business
  form: FormGroup

  constructor(public variant: VariationService, private formBuilder: FormBuilder, private sk: StockService) {
    // console.log(stock);
  }

  ngOnInit() {
    // this.variant.activeBusiness();
    if (this.variation) {
      this.form = this.formBuilder.group({
        name: [this.variation.name ? this.variation.name : '', Validators.required],
        sku: this.variation.sku ? this.variation.sku : this.variant.generateSKU(),
        retailPrice: [ this.stock?this.stock.retailPrice:0.00, Validators.min(0)],
        supplyPrice: [ this.stock?this.stock.supplyPrice:0.00, Validators.min(0)],
        unit:  this.variation.unit ? this.variation.unit : '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }
  }
  onSubmit() {}

  updateVariant(key: any, event: any) {
    const val = key === 'unit' ? event.value : event.target.value

    if (key === 'retailPrice' || key === 'supplyPrice') {
      const myStock = this.stock

      myStock[key] = parseInt(val, 10)

      if (myStock) {
        return this.sk.update(myStock)
      }
    } else {
      return this.variant.updateRegularVariant(this.variation, key, val)
    }
  }

  focusing(value) {
    this.isFocused = value

    if (value === 'retailPrice') {
      this.variant.form.controls.retailPrice.setValue('')
    } else if (value === 'supplyPrice') {
      this.variant.form.controls.supplyPrice.setValue('');
    } else if (value === 'sku') {
      this.variant.form.controls.sku.setValue('');
    } else if (value === 'name') {
      this.variant.form.controls.name.setValue('')
    }
  }

  async focusingOut() {
    if (
      this.isFocused === 'retailPrice' &&
      (this.variant.form.controls.retailPrice.value === 0 || this.variant.form.controls.retailPrice.value === '')
    ) {
      this.variant.form.controls.retailPrice.setValue(this.stock.retailPrice ? this.stock.retailPrice : 0)
    }
    if (
      this.isFocused === 'supplyPrice' &&
      (this.variant.form.controls.supplyPrice.value === 0 || this.variant.form.controls.supplyPrice.value === '')
    ) {
      this.variant.form.controls.supplyPrice.setValue(this.stock.supplyPrice ? this.stock.supplyPrice : 0)
    }

          if (this.isFocused === 'sku' && (this.variant.form.controls.sku.value === 0 ||
            this.variant.form.controls.sku.value === '')) {
              this.variant.form.controls.sku.setValue(this.variation.sku);
            }
          if (this.isFocused === 'name' && (this.variant.form.controls.name.value === 0 ||
            this.variant.form.controls.name.value === '')) {
              this.variant.form.controls.name.setValue(this.variation.name);
            }

    this.isFocused = ''
  }
}
