import { Injectable } from '@angular/core'
import {
  Variant,
  SettingsService,
  Business,
  Branch,
  Product,
  Labels,
  PouchDBService,
  Stock,
} from '@enexus/flipper-components'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { VariantsDialogModelComponent } from '../variants/variants-dialog-model/variants-dialog-model.component'
import { DialogService } from '@enexus/flipper-dialog'
import { StockService } from './stock.service'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { ViewStockHistoryComponent } from '../view-stock-history/view-stock-history.component'
import { PrintBarcodeLabelsDialogComponent } from '../print-barcode-labels-dialog/print-barcode-labels-dialog.component'
import { DialogSize } from '@enexus/flipper-dialog'
import { HttpClient } from '@angular/common/http'
import { flipperUrl } from '../constants'

@Injectable({
  providedIn: 'root',
})
export class VariationService {
  hasRegular: Variant = null
  myAllVariants: Variant[] = []
  sku = ''
  d = new Date()
  units: any[] = []
  form: FormGroup
  product: Product
  variantsSubject: BehaviorSubject<Variant[]>
  defaultBusiness: Business = null
  allVariants: Variant[] = []
  branches$: Branch[] = []
  private readonly variantsMap = new Map<string, Variant>()
  variant: Variant

  variantStock = { length: 0, currentStock: 0, lowStock: 0 }
  constructor(
    private http: HttpClient,
    private stock: StockService,
    private dialog: DialogService,
    private setting: SettingsService,
    private formBuilder: FormBuilder,
    private database: PouchDBService
  ) {
    this.variantsSubject = new BehaviorSubject([])
    this.units = this.setting.units()
  }

  public loadAllVariants(product: Product): Observable<Variant[]> {
    const data: Variant[] = []
    // this.allVariant(product).forEach(d => data.push(d as Variant));
    this.variantsSubject.next(data)
    this.variantsMap.clear()
    data.forEach(variant => this.variantsMap.set(variant.id as any, variant))
    return of(data)
  }

  public host(id: string): Variant | undefined {
    return this.variantsMap.get(id)
  }

  currentBranches() {
    return this.database.listBusinessBranches().then(branches => {
      this.branches$ = branches
    })
  }

  async init(product: Product) {
    if (product != undefined) {
      console.log('should show only once!')
      this.product = product
      await this.allVariant(product)
      this.regular()
      this.createRegular(product)
      this.stockUpdates()
    }
  }
  activeBusiness() {
    return this.database.currentBusiness().then(business => {
      this.defaultBusiness = business
    })
  }

  updateDefaultUnit(variation: Variant, key: string, id: string): void {
    this.updateRegularVariant(variation, key, id)
  }

  findVariant(variantId: string) {
    return this.database
      .query(['table', 'id'], {
        table: { $eq: 'variants' },
        id: { $eq: variantId },
      })
      .then(res => {
        if (res.docs && res.docs.length > 0) {
          this.variant = res.docs[0] as Variant
        } else {
          this.variant = null
        }
      })
  }

  findFirst(productId: string): Variant {
    return this.database
      .query(['table', 'productId'], {
        table: { $eq: 'variants' },
        productId: { $eq: productId },
      })
      .then(res => {
        if (res.docs && res.docs.length > 0) {
          this.variant = res.docs[0] as Variant
        } else {
          this.variant = null
        }
      })
  }

  async request(action = null, variant = null) {
    await this.stock.findVariantStock(variant ? variant.id : null)
    const stock: Stock = this.stock.stock ? this.stock.stock : null

    this.form = this.formBuilder.group({
      name: [!action && variant && variant.name ? variant.name : '', Validators.required],
      sku: !action && variant && variant.sku ? variant.sku : this.generateSKU(),
      retailPrice: [!action && variant && stock ? stock.retailPrice : 0.0, Validators.min(0)],
      supplyPrice: [!action && variant && stock ? stock.supplyPrice : 0.0, Validators.min(0)],
      unit: !action && variant && variant.unit ? variant.unit : '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  generateSKU(): string {
    return this.d.getFullYear() + '' + this.makeid(4)
  }

  makeid(length: number) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  create(variant: Variant) {
    return this.database.put(variant.id, variant)
  }
  delete(variant: Variant) {
    return this.database.remove(variant)
  }

  async createRegular(product: any, branches = []) {
    if (branches.length == 0) {
      await this.currentBranches()
      branches = this.branches$
    }
    if (!this.hasRegular) {
      const formData = {
        name: 'Regular',
        productName: product.name,
        productId: product.id,
        unit: this.units.length > 0 ? this.units[0].value : '',
        sku: this.generateSKU(),
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        channels: [localStorage.getItem('userIdNew')],
        userId: localStorage.getItem('userIdNew'),
        table: 'variants',
      }

      // await this.database.put(formData.id, formData);
      await this.http
        .post(flipperUrl + '/api/variant', formData)
        .toPromise()
        .then()
      this.createVariantStock(formData, branches)
      this.allVariant(product)
      this.regular()
    }
  }

  async createVariantStock(formData: any, branches = []) {
    // console.log(branches);
    return await this.stock.createStocks(formData, branches)
  }

  async variants(product: Product) {
    return this.allVariant(product)
  }

  async productStockHistory(product: Product) {
    const variantIds: string[] = []
    await this.allVariant(product)
    this.allVariants.forEach(sh => {
      variantIds.push(`'${sh.id}'`)
    })
    return this.stock.productStockHistory(variantIds)
  }

  async allVariant(product: Product) {
    return this.http
      .get<[Variant]>(flipperUrl + '/api/variants/' + product.id)
      .toPromise()
      .then(variants => {
        this.allVariants = variants as Variant[]
      })
    // return this.productVariations(product.id).then(res => {
    //   this.allVariants = res as Variant[]
    // })
  }
  // productVariations(productId) {
  //   return this.database
  //     .query(['table', 'productId'], {
  //       table: { $eq: 'variants' },
  //       productId: { $eq: productId },
  //     })
  //     .then(res => {
  //       if (res.docs && res.docs.length > 0) {
  //         return res.docs as Variant[]
  //       } else {
  //         return []
  //       }
  //     })
  // }
  // as on POS we only show all variations regadless of the product
  variations() {
    return this.http
      .get<[Variant]>(flipperUrl + '/api/variants')
      .toPromise()
      .then(variants => {
        // this.allVariants = variants as Variant[]
        this.allVariants = variants as Variant[]
      })

    // return this.database
    //   .query(['table'], {
    //     table: { $eq: 'variants' },
    //   })
    //   .then(res => {
    //     if (res.docs && res.docs.length > 0) {
    //       this.allVariants = res.docs as Variant[]
    //     } else {
    //       this.allVariants = []
    //     }
    //   })
  }

  get formControl() {
    return this.form.controls
  }

  regular() {
    this.hasRegular = this.allVariants.length > 0 ? this.allVariants[0] : null
  }

  updateRegularVariant(variation: Variant, key: string, val: any): void {
    if (variation) {
      if (key === 'sku' && val === '') {
        val = variation.sku
      }

      variation[key] = val
    }

    return this.update(variation)
  }

  update(variation: Variant): void {
    if (variation) {
      // console.log('need to update variant',variation);
      return this.database.put(variation.id, variation)
    }
  }

  public openVariantDialog(variant: Variant, selectedIndex: number, stock = null, stocks = [], currency = 'RWF'): any {
    return this.dialog
      .open(VariantsDialogModelComponent, DialogSize.SIZE_MD, { variant, selectedIndex, stock, stocks, currency })
      .subscribe(result => {
        this.updateStockControl(result, variant)
        //  this.regular();
        //  this.request(null, variant);
        //  this.varia nts(this.product);
        //  this. stockUpdates();
      })
  }

  async updateStockControl(result: any, variant: Variant) {
    if (result) {
      if (result.length > 0) {
        result.forEach(res => {
          if (res.reason && res.currentStock > 0) {
            this.stock.createHistory({
              id: this.database.uid(),
              orderId: null,
              variantId: variant.id,
              productId: variant.productId,
              stockId: res.id,
              reason: res.reason,
              quantity: res.currentStock,
              note: res.reason,
              table: 'stockHistories',
              channels: [localStorage.getItem('userIdNew')],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })
          }
          // update Stock
          if (res.reason && res.currentStock > 0) {
            if (res.reason === 'Received' || res.reason === 'Restocked') {
              if (!(res.currentStock === 0 || res.currentStock === null)) {
                res.stock.currentStock = res.stock.currentStock + res.currentStock
              }
            } else if (res.reason === 'Re-counted') {
              if (!(res.currentStock === 0 || res.currentStock === null)) {
                res.stock.currentStock = res.currentStock
              }
            } else {
              if (!(res.currentStock === 0 || res.currentStock === null)) {
                res.stock.currentStock = res.stock.currentStock - res.currentStock
              }
            }
          } else {
            res.currentStock = res.stock.currentStock
          }

          // FIXME: this code does not make sense
          // if (res.currentStock === 0 || res.currentStock === null || res.currentStock === '') {
          //   res.stock.currentStock = res.stock.currentStock
          // }

          res.stock.canTrackingStock = res.canTrackingStock
          res.stock.lowStock = res.lowStock
          res.stock.showLowStockAlert = res.showLowStockAlert

          this.stock.update(res.stock)
        })
      }
    }
  }

  public openStockHistoryDialog(variant: any = null, isArray = false): any {
    return this.dialog.open(ViewStockHistoryComponent, DialogSize.SIZE_LG, { variant, isArray })
  }

  public openPrintBarcodeLablesDialog(product, allVariants): any {
    const labels: Labels[] = []
    allVariants.forEach(v => {
      labels.push({ name: v.name, sku: v.sku, channels: [localStorage.getItem('userIdNew')] })
    })
    return this.dialog.open(PrintBarcodeLabelsDialogComponent, DialogSize.SIZE_LG, labels).subscribe()
  }

  async deleteProductVariations(product: Product) {
    if (product) {
      await this.allVariant(product)
      if (this.allVariants.length > 0) {
        this.allVariants.forEach(variation => {
          this.stock.deleteStocks(variation)
          this.stock.deleteStocksHistory(variation)
          this.delete(variation)
        })
      }
    }
  }

  deleteVariations(): void {
    const variations: Variant[] = this.allVariants
    if (variations.length > 0) {
      variations.forEach(variation => {
        this.stock.deleteStocks(variation)
        this.stock.deleteStocksHistory(variation)
        this.database.remove(variation)
      })
    }
  }

  deleteVariation(variant: Variant, product: Product): void {
    if (variant) {
      this.dialog.delete('Variant', [`Variant: ${variant.name}`]).subscribe(confirm => {
        this.stock.deleteStocks(variant)
        this.stock.deleteStocksHistory(variant)
        return this.database.remove(variant)
      })
    }
  }

  async stockUpdates() {
    if (this.hasRegular) {
      await this.stock.variantStocks(this.hasRegular.id)
      const stock = this.stock.stocks
      this.variantStock = {
        length: stock.length,
        lowStock: stock.length > 0 ? stock[0].lowStock : 0,
        currentStock: stock.length > 0 ? stock[0].currentStock : 0,
      }
    }
  }

  async updateVariantAction(product: Product) {
    await this.allVariant(product)
    if (this.allVariants.length > 0) {
      this.allVariants.forEach(variant => {
        this.stock.updateStockHistoryAction(variant.id)
        variant.isActive = true
        this.update(variant)
      })
    }
  }
}
