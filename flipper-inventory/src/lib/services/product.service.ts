import { Injectable } from '@angular/core'
import {
  Product,
  Business,
  Branch,
  Taxes,
  Variant,
  Stock,
  User,
  AllVariant,
  CurrentBusinessEvent,
} from '@enexus/flipper-components'
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { VariationService } from './variation.service'
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { flipperUrl } from '../constants'
import { FlipperEventBusService } from '@enexus/flipper-event'
import * as Sentry from "@sentry/angular";
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  enableToAdd = false
  hasDraftProduct: Product = null
  form: FormGroup
  branches$: Branch[] = []
  taxes$: Taxes[] = []
  branchList = new FormControl()
  products: Product[] = []

  public productsSubject: BehaviorSubject<Product[]>
  private readonly productsMap = new Map<string, Product>()
  defaultBusiness$: Business = null
  defaultBranch$: Branch = null
  currentUser$: User = null
  defaultTaxe$: Taxes = null
  allVariants: AllVariant[]
  stocks: Stock[] = []

  constructor(
    private http: HttpClient,
    private variant: VariationService,
    private eventBus: FlipperEventBusService,
    private formBuilder: FormBuilder,
  ) {
    this.productsSubject = new BehaviorSubject([])
  }

  async init() {
    await this.currentBusiness()
    await this.loadAllProducts();
    await this.currentBranches()
    await this.currentTaxes()
    await this.hasDraft()
    await this.create()
  }

  public async currentBusiness() {
    await this.http
      .get<Business>(flipperUrl + '/api/business')
      .toPromise()
      .then(business => {
        this.defaultBusiness$ = business
        this.eventBus.publish(new CurrentBusinessEvent(business))
      })
  }
  async currentBranches() {
    await this.http
        .get<[Branch]>(flipperUrl + '/api/branches/' + this.defaultBusiness$.id)
        .toPromise()
        .then((branches: Branch[]) => {
          this.branches$ = branches.filter(res => res.active == true)
        })
  }

  async currentTaxes() {
    await this.http
        .get<[Taxes]>(flipperUrl + '/api/taxes')
        .toPromise()
        .then((taxes: Taxes[]) => {
          this.taxes$ = taxes
        })
  }

  //stocks
  getProductStocks({ productId }: any) {
    this.http.get<[Stock]>(flipperUrl + '/api/stocks-byProductId/' + productId).subscribe(stocks => {
      this.stocks = stocks
    },(error)=>{

    })
  }

  productVariations(productId) {
    return this.http.get<[Variant]>(flipperUrl + '/api/variants/' + productId).toPromise()
  }
  public async loadAllProducts() {
    await this.productsList()
  }
  public async productsList() {
    await this.http
      .get<[Product]>(flipperUrl + '/api/products')
      .toPromise()
      .then(products => {
        this.products = products as Product[]
      })
  }

  public host(id: string): Product | undefined {
    return this.productsMap.get(id)
  }

  async request() {
    const hasDraftProduct = this.hasDraftProduct
    this.form = this.formBuilder.group({
      name: [hasDraftProduct ? hasDraftProduct.name : '', Validators.required],
      categoryId: hasDraftProduct ? hasDraftProduct.categoryId : 0,
      description: hasDraftProduct ? hasDraftProduct.description : '',
      taxId: hasDraftProduct ? hasDraftProduct.taxId : '',
      supplierId: hasDraftProduct ? hasDraftProduct.supplierId : 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  get formControl() {
    return this.form.controls
  }
  async hasDraft() {
    await this.http
      .get(flipperUrl + '/api/getDraftProduct')
      .toPromise()
      .then((draft: Product) => {
        if (draft) {
          this.hasDraftProduct = draft;
          this.allVariants = draft.allVariants;
          this.getProductStocks({ productId: this.hasDraftProduct.id })
        }
      }).catch((error:any)=> {
        Sentry.captureException(error);
      })
  }

  async create() {
    if (this.defaultBusiness$ && !this.hasDraftProduct) {
      const formProduct = {
        name: 'new item',
        businessId: this.defaultBusiness$ ? this.defaultBusiness$.id : 0,
        draft: true,
        active: false,
        taxId: this.taxes$.find(tax => tax.isDefault == true) ? this.taxes$.find(tax => tax.isDefault == true).id : '0', // this.model.findByFirst<Taxes>(Tables.taxes, 'isDefault', true).id,
        description: '',
        hasPicture: false,
        supplierId: 0,
        categoryId: 0,
        table: 'products',
        color: '#000000',
        picture: '/assets/icons/add-image-placeholder.png', //FIXME: replace with internet url or find how android would load this
        isCurrentUpdate: false,
        branchId: this.branches$.length > 0 ? this.branches$[0].id : '0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: localStorage.getItem('userIdNew'),
        channels: [localStorage.getItem('userIdNew')],
      }
      // await this.database.put(formProduct.id, formProduct);
      await this.http
        .post(flipperUrl + '/api/product', formProduct)
        .toPromise()
        .then()
      if (this.branches$.length > 0) {
        this.variant.createRegular(formProduct, this.branches$)
      }
    }
    await this.hasDraft()
  }

  canAddProduct(): void {
    this.enableToAdd = false
  }

  allowToAddProduct(bol: boolean): void {
    this.enableToAdd = bol
    localStorage.setItem('userIsCreatingAnItem', `${bol}`)
  }

  async update() {
    if (this.hasDraftProduct) {
      await this.http
        .put(flipperUrl + '/api/product/' + this.hasDraftProduct.id, this.hasDraftProduct)
        .toPromise()
        .then()
    }
  }

  updateKeyValue(key: string, val: any) {
    if (this.hasDraftProduct) {
      this.hasDraftProduct[key] = val
    }
  }

  async discardProduct() {
    if (this.hasDraftProduct) {
      await this.http
      .delete(flipperUrl + '/api/product/' + this.hasDraftProduct.id)
      .toPromise()
      .then()
    }
  }

  async saveProduct() {
    if (this.hasDraftProduct) {
      this.hasDraftProduct.active = true
      this.hasDraftProduct.draft = false
      this.hasDraftProduct.color = '#000000'
      this.update()
    }
  }
}
