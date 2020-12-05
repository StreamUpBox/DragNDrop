import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { VariationService } from '../../services/variation.service'
import { StockService } from '../../services/stock.service'
import { Product, Variant, CalculateTotalClassPipe, Business, Stock } from '@enexus/flipper-components'
import { DialogService, DialogSize } from '@enexus/flipper-dialog'
import { AddVariantComponent } from '../add-variant/add-variant.component'
import { VariantsDialogModelComponent } from '../variants-dialog-model/variants-dialog-model.component'

@Component({
  selector: 'flipper-added-variants',
  templateUrl: './added-variants.component.html',
  styleUrls: ['../../create-product/create-product.component.css', './added-variants.component.css'],
})
export class AddedVariantsComponent implements OnInit {
  item: Product
  variantion: Variant[]
  business: Business
  pstocks: Stock[]
  @Input('product')
  set product(item: Product) {
    this.item = item
  }
  get product(): Product {
    return this.item
  }

  @Input('variantions')
  set variantions(items: Variant[]) {
    this.variantion = items
  }
  get variantions(): Variant[] {
    return this.variantion
  }
  @Input('stocks')
  set stocks(items: Stock[]) {
    this.pstocks = items
  }
  get stocks(): Stock[] {
    return this.pstocks
  }

  @Input('defaultBusiness')
  set defaultBusiness(item: Business) {
    this.business = item
  }
  get defaultBusiness(): Business {
    return this.business
  }
  @Output() didAddNewVariant = new EventEmitter<boolean>(false)

  constructor(
    private dialog: DialogService,
    private totalPipe: CalculateTotalClassPipe,
    public variant: VariationService,
    public stock: StockService
  ) {}

  ngOnInit() {
    this.variant.activeBusiness()
  }

  getTotalStock(variantId, key: any): number {
    const stocks = this.stocks.filter(stock => stock.variantId == variantId)
    if (stocks.length > 0) {
      return this.totalPipe.transform(stocks, key)
    } else {
      return 0
    }
  }

  convertInt(num) {
    return parseInt(num, 10)
  }

  public openAddVariantDialog(product: Product): any {
    return this.dialog
      .open(AddVariantComponent, DialogSize.SIZE_MD, { product: product, currency: this.defaultBusiness.currency })
      .subscribe(result => {
        if (result === 'done') {
          this.didAddNewVariant.emit(true)
        }
      })
  }

  public async openVariantDialog(variant: Variant, selectedIndex: number, stock = null, stocks = [], currency = 'RWF') {
    await this.stock.findVariantStocks(variant.id)
    stocks = this.stock.stocks
    currency = this.defaultBusiness.currency
    stock = stocks[0]

    return await this.dialog
      .open(VariantsDialogModelComponent, DialogSize.SIZE_MD, { variant, selectedIndex, stock, stocks, currency })
      .subscribe(result => {
        if (result) {
          this.variant.updateStockControl(result, variant)
        }
        this.didAddNewVariant.emit(true)
      })
  }
  deleteProductVariation() {
    if (this.product) {
      this.variant.deleteProductVariations(this.product)
      this.variant.init(this.product)
    }
  }

  allVariant(product: Product) {
    const variants: Variant[] = []

    this.variant.allVariant(product)
    if (this.variant.allVariants.length > 0) {
      this.variant.allVariants.forEach(variant => {
        variants.push(variant)
      })
    }
    return variants
  }

  deleteVariation(variant: Variant): void {
    if (variant) {
      this.dialog.delete('Variant', [`Variant: ${variant.name}`]).subscribe(confirm => {
        this.stock.deleteStocks(variant)
        this.stock.deleteStocksHistory(variant)
        this.variant.delete(variant)
        this.didAddNewVariant.emit(true)
      })
    }
  }

  async deleteAllVariantsDialog(product: Product) {
    const variants = []
    await this.allVariant(product)

    this.variant.allVariants.forEach((v, i) => {
      variants.push(`${i + 1}. ${v.name}`)
    })
    this.dialog.delete('Variants', variants).subscribe(async confirm => {
      if (this.variant.allVariants.length > 0) {
        this.variant.allVariants.forEach(variation => {
          this.stock.deleteStocks(variation)
          this.stock.deleteStocksHistory(variation)
          this.variant.delete(variation)
        })

        await this.variant.createRegular(product)
        this.didAddNewVariant.emit(true)
      }
    })
  }
}
