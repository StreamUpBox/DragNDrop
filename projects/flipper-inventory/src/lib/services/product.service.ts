import { Injectable } from '@angular/core'
import {
  Product,
  Business,
  Branch,
  Taxes,
  PouchDBService,
  PouchConfig,
  Variant,
  Stock,
  User,
} from '@enexus/flipper-components'
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { VariationService } from './variation.service'
import { BehaviorSubject } from 'rxjs'

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
  allVariants: Variant[]
  stocks: Stock[] = []

  constructor(private variant: VariationService, private formBuilder: FormBuilder, private database: PouchDBService) {
    this.productsSubject = new BehaviorSubject([])
  }

  async init() {
    await this.currentBusiness()
    await this.currentBranches()
    await this.currentTaxes()
    await this.hasDraft()
    await this.create()
  }

  public currentBusiness() {
    return this.database.currentBusiness().then(business => {
      this.defaultBusiness$ = business
    })
  }
  currentBranches() {
    return this.database.listBusinessBranches().then(branches => {
      this.branches$ = branches
    })
  }

  currentTaxes() {
    return this.database.listBusinessTaxes().then(taxes => {
      this.taxes$ = taxes
    })
  }
  async allVariant(product: Product) {
    return this.productVariations(product.id).then(res => {
      this.allVariants = res as Variant[]
    })
  }

  //stocks
  getProductStocks(productId: any) {
    return this.database
      .query(['table', 'productId'], {
        table: { $eq: 'stocks' },
        productId: { $eq: productId },
      })
      .then(res => {
        if (res.docs && res.docs.length > 0) {
          this.stocks = res.docs
        } else {
          this.stocks = null
        }
      })
  }

  productVariations(productId) {
    return this.database
      .query(['table', 'productId'], {
        table: { $eq: 'variants' },
        productId: { $eq: productId },
      })
      .then(res => {
        if (res.docs && res.docs.length > 0) {
          return res.docs as Variant[]
        } else {
          return []
        }
      })
  }

  public async loadAllProducts(businessId) {
    await this.productsList(businessId)
  }
  public async productsList(businessId) {
    return await this.database
      .query(['table', 'businessId'], {
        table: { $eq: 'products' },
        businessId: { $eq: businessId },
      })
      .then(res => {
        if (res.docs && res.docs.length > 0) {
          this.products = res.docs as Product[]
        } else {
          this.products = [] as Product[]
        }
      })
  }

  public host(id: string): Product | undefined {
    return this.productsMap.get(id)
  }

  async request() {
    const hasDraftProduct = this.hasDraftProduct
    this.form = await this.formBuilder.group({
      name: [hasDraftProduct ? hasDraftProduct.name : '', Validators.required],
      categoryId: hasDraftProduct ? hasDraftProduct.categoryId : 0,
      description: hasDraftProduct ? hasDraftProduct.description : '',
      picture: hasDraftProduct ? hasDraftProduct.picture : '',
      taxId: hasDraftProduct ? hasDraftProduct.taxId : '',
      supplierId: hasDraftProduct ? hasDraftProduct.supplierId : 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  get formControl() {
    return this.form.controls
  }

  hasDraft() {
    return this.database.hasDraftProduct(this.defaultBusiness$ ? this.defaultBusiness$.id : 0).then(draft => {
      if (draft && draft.docs.length > 0) {
        this.hasDraftProduct = draft.docs[0]
        this.allVariant(this.hasDraftProduct)
        this.getProductStocks(this.hasDraftProduct.id)
      }
    })
  }

  async create() {
    if (this.defaultBusiness$ && !this.hasDraftProduct) {
      const formProduct = {
        id: this.database.uid(),
        name: 'new item',
        businessId: this.defaultBusiness$ ? this.defaultBusiness$.id : 0,
        isDraft: true,
        active: false,
        taxId: this.taxes$.find(tax => tax.isDefault == true) ? this.taxes$.find(tax => tax.isDefault == true).id : '0', // this.model.findByFirst<Taxes>(Tables.taxes, 'isDefault', true).id,
        description: '',
        hasPicture: false,
        supplierId: 0,
        categoryId: 0,
        table: 'products',
        color: '#000000',
        picture: '/assets/icons/add-image-placeholder.png',
        isCurrentUpdate: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: this.defaultBusiness$.userId,
        channels: [this.defaultBusiness$.userId],
      }

      await this.database.put(PouchConfig.Tables.products + '_' + formProduct.id, formProduct)
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

  updateBranch(): void {
    if (this.hasDraftProduct && this.branchList.value.length > 0) {
      this.branchList.value.forEach(id => {
        this.database.put(PouchConfig.Tables.branchProducts + '_' + this.hasDraftProduct.id, {
          id: this.database.uid(),
          productId: this.hasDraftProduct.id,
          branchId: id,
        })
      })
    }
  }

  async update() {
    if (this.hasDraftProduct) {
      return await this.database.put(PouchConfig.Tables.products + '_' + this.hasDraftProduct.id, this.hasDraftProduct)
    }
  }

  updateKeyValue(key: string, val: any) {
    if (this.hasDraftProduct) {
      this.hasDraftProduct[key] = val
    }
  }

  async discardProduct() {
    // console.log('need discard');
    if (this.hasDraftProduct) {
      await this.variant.deleteProductVariations(this.hasDraftProduct)

      await this.database.remove(this.hasDraftProduct)
    }
  }

  updateOnlineDatabase() {
    if (PouchConfig.canSync) {
      this.database.sync([localStorage.getItem('userId')])
    }
    if (!this.hasDraftProduct.isDraft) {
      this.database.put(PouchConfig.Tables.products + '_' + this.hasDraftProduct.id, this.hasDraftProduct)

      if (this.hasDraftProduct) {
        //TODO: now update this function so it works!.
        // this.variant.deleteProductVariations(this.hasDraftProduct);
        // this.model.delete(Tables.products, '"' + this.hasDraftProduct.id + '"');
      }
    }
  }
  async saveProduct() {
    if (this.hasDraftProduct) {
      this.hasDraftProduct.active = true
      this.hasDraftProduct.isDraft = false
      this.hasDraftProduct.isCurrentUpdate = false
      this.hasDraftProduct.color = '#000000'
      this.hasDraftProduct.updatedAt = new Date().toISOString()
      this.update()
    }
  }
}
