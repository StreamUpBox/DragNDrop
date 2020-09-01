import { Injectable } from '@angular/core';
import {
  Product, MainModelService, Tables, Business,
  Branch, Taxes, BranchProducts, PouchDBService,
  PouchConfig, Variant, Stock, StockHistory, BranchesEvent, User, CacheService
} from '@enexus/flipper-components';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { VariationService } from './variation.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ModelService } from '@enexus/flipper-offline-database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  enableToAdd = false;
  hasDraftProduct: Product = null;
  form: FormGroup;
  branches$: Branch[] = [];
  taxes$: Taxes[] = [];
  branchList = new FormControl();
  products: Product[] = [];


  public productsSubject: BehaviorSubject<Product[]>;
  private readonly productsMap = new Map<string, Product>();
  defaultBusiness$: Business = null;
  defaultBranch$: Branch = null;
  currentUser$: User = null;
  defaultTaxe$: Taxes = null;

  constructor(private query: ModelService,
    private cacheService: CacheService,
    private model: MainModelService,
    private variant: VariationService,
    private formBuilder: FormBuilder,
    private database: PouchDBService) {
    this.productsSubject = new BehaviorSubject([]);



  }

  async init() {

    await this.currentBusiness();
    await this.currentBranches();
    await this.currentTaxes()
    await this.hasDraft();
    await this.create();


  }


  public currentBusiness() {
    return this.database.currentBusiness().then(business => {
      this.defaultBusiness$ = business;
    });
  }
  currentBranches() {
    return this.database.listBusinessBranches().then(branches => {
      this.branches$ = branches;
    });
  }

  currentTaxes() {
    return this.database.listBusinessTaxes().then(taxes => {
      this.taxes$ = taxes;
    });
  }


  public loadAllProducts(): Observable<Product[]> {
    const data: Product[] = [];
    this.query.queries<Product>(Tables.products, `  isDraft=${false}
     AND businessId='${this.model.active<Business>(Tables.business).id}' ORDER BY createdAt DESC `).
      forEach(d => data.push(d as Product));
    this.productsSubject.next(data);
    this.productsMap.clear();
    data.forEach(product => this.productsMap.set(product.id as any, product));
    return of(data);
  }

  public host(id: string): Product | undefined {
    return this.productsMap.get(id);
  }


  async request() {
    const hasDraftProduct = this.hasDraftProduct;
    this.form = await this.formBuilder.group({
      name: [hasDraftProduct ? hasDraftProduct.name : '', Validators.required],
      categoryId: hasDraftProduct ? hasDraftProduct.categoryId : 0,
      description: hasDraftProduct ? hasDraftProduct.description : '',
      picture: hasDraftProduct ? hasDraftProduct.picture : '',
      taxId: hasDraftProduct ? hasDraftProduct.taxId : '',
      supplierId: hasDraftProduct ? hasDraftProduct.supplierId : 0,
      createdAt: new Date(),
      updatedAt: new Date()

    });
  }

  get formControl() { return this.form.controls; }


  hasDraft() {

    return this.database.hasDraftProduct(this.defaultBusiness$ ? this.defaultBusiness$.id : 0).then(draft => {
      if (draft && draft.docs.length > 0) {
        this.hasDraftProduct = draft.docs[0];
      }
    });


  }


  async create() {
   
    if (this.defaultBusiness$ && !this.hasDraftProduct) {

      const formProduct = await {
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
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await this.database.put(PouchConfig.Tables.products + '_' + formProduct.id, formProduct);
    }
  }


  canAddProduct(): void {
    this.enableToAdd = false;
  }

  allowToAddProduct(bol: boolean): void {
    this.enableToAdd = bol;
    localStorage.setItem('userIsCreatingAnItem', `${bol}`);
  }



  loadBranches(): void {
    let arr = [];
    if (this.hasDraftProduct) {
      arr = this.model.filters<BranchProducts>(Tables.branchProducts, 'productId', this.hasDraftProduct.id);
      const branch: Branch = this.query.queries<Branch>(Tables.branch, `
       active=${true} AND businessId='${this.model.active<Business>(Tables.business).id}' ORDER BY id DESC `)[0];
      if (arr.length === 0) {
        this.model.create<BranchProducts>(Tables.branchProducts, {
          id: this.database.uid(),
          productId: this.hasDraftProduct.id,
          branchId: branch.id
        });

        this.branchList.setValue([branch.id]);


      } else {

        arr.forEach(el => arr.push(el.branchId));
        this.branchList.setValue(arr);

      }
    }

  }




  updateBranch(): void {

    if (this.hasDraftProduct && this.branchList.value.length > 0) {
      this.branchList.value.forEach(id => {
        this.database.put(PouchConfig.Tables.branchProducts + '_' + this.hasDraftProduct.id, {
          id: this.database.uid(),
          productId: this.hasDraftProduct.id,
          branchId: id
        });
      });
    }
  }

  update(): Product {
    if (this.hasDraftProduct) {
      return this.database.put(PouchConfig.Tables.products + '_' + this.hasDraftProduct.id, this.hasDraftProduct);
    }

  }
  updateProduct(product: Product) {
    return this.model.update<Product>(Tables.products, product, product.id);
  }

  updateKeyValue(key: string, val: any) {
    if (this.hasDraftProduct) {
      this.hasDraftProduct[key] = val;
    }
  }

  discardProduct(): void {
    if (this.hasDraftProduct) {
      this.variant.deleteProductVariations(this.hasDraftProduct);

      this.model.delete(Tables.products, '"' + this.hasDraftProduct.id + '"');
    }
  }


  updateOnlineDatabase() {
    if (PouchConfig.canSync) {
      this.database.sync(PouchConfig.syncUrl);
    }
    if (!this.hasDraftProduct.isDraft) {

      this.database.put(PouchConfig.Tables.products + '_' + this.hasDraftProduct.id, this.hasDraftProduct);

      if (this.hasDraftProduct) {
        //TODO: now update this function so it works!.

        // this.variant.deleteProductVariations(this.hasDraftProduct);

        // this.model.delete(Tables.products, '"' + this.hasDraftProduct.id + '"');
      }
    }

  }
    async saveProduct() {

      if (this.hasDraftProduct) {
        this.variant.updateVariantAction(this.hasDraftProduct);
        this.hasDraftProduct.active = true;
        this.hasDraftProduct.isDraft = false;
        this.hasDraftProduct.isCurrentUpdate = false;
        this.hasDraftProduct.color = '#000000';
        this.hasDraftProduct.updatedAt = new Date();
        this.update();


      }

    }

  }
