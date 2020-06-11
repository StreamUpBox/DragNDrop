import { Injectable } from '@angular/core';
import { Product, MainModelService, Tables, Business,
  Branch, Taxes, BranchProducts, PouchDBService,
  PouchConfig, Variant, Stock, StockHistory } from '@enexus/flipper-components';
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


  constructor(private query: ModelService,
              private model: MainModelService,
              private variant: VariationService,
              private formBuilder: FormBuilder,

              private database: PouchDBService) {
              this.productsSubject = new BehaviorSubject([]);

  }

  init(): void {
    this.hasDraft();
    this.branches$ = this.model.filters<Branch>(Tables.branch, 'businessId', this.model.active<Business>(Tables.business).id);
    this.taxes$ = this.model.filters<Taxes>(Tables.taxes, 'businessId', this.model.active<Business>(Tables.business).id);
    this.create();
    this.loadBranches();
  }

  public loadAllProducts(): Observable<Product[]> {
    const data: Product[] = [];
    this.query.queries<Product>(Tables.products, `  isDraft=${false}
     AND businessId='${this.model.active<Business>(Tables.business).id}' ORDER BY id DESC `).
     forEach(d => data.push(d as Product));
    this.productsSubject.next(data);
    this.productsMap.clear();
    data.forEach(product => this.productsMap.set(product.id as any, product));
    return of(data);
  }

  public host(id: string): Product | undefined {
    return this.productsMap.get(id);
  }


  request(): void {
    const hasDraftProduct = this.model.draft<Product>(Tables.products, 'isDraft');
    this.hasDraftProduct = hasDraftProduct;
    this.form = this.formBuilder.group({
      name: [hasDraftProduct && hasDraftProduct.name && hasDraftProduct.name === 'new item' ? ''
       : hasDraftProduct.name, Validators.required],
      categoryId: hasDraftProduct && hasDraftProduct.categoryId ? hasDraftProduct.categoryId : 0,
      description: hasDraftProduct && hasDraftProduct.description ? hasDraftProduct.description : '',
      picture: hasDraftProduct && hasDraftProduct.picture ? hasDraftProduct.picture : '',
      taxId: hasDraftProduct && hasDraftProduct.taxId ? hasDraftProduct.taxId : '',
      supplierId: hasDraftProduct && hasDraftProduct.supplierId ? hasDraftProduct.supplierId : 0,
      createdAt: new Date(),
      updatedAt: new Date()

    });
  }

  get formControl() { return this.form.controls; }

  hasDraft(): void {
    this.hasDraftProduct = this.model.draft<Product>(Tables.products, 'isDraft');
  }

  create(): void {
    const hasDraftProduct = this.model.draft<Product>(Tables.products, 'isDraft');
    if (!hasDraftProduct) {
      this.model.create<Product>(Tables.products, {
        id: this.database.uid(),
        name: 'new item',
        businessId: this.model.active<Business>(Tables.business).id,
        isDraft: true,
        active: false,
        taxId: this.model.findByFirst<Taxes>(Tables.taxes, 'isDefault', true).id,
        description: '',
        hasPicture: false,
        supplierId: 0,
        categoryId: 0,
        color: '#000000',
        picture: '/assets/icons/add-image-placeholder.png',
        isCurrentUpdate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
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


  deleteAllBranches(): void {
    if (this.hasDraftProduct) {
      const branches = this.model.filters<BranchProducts>(Tables.branchProducts, 'productId', this.hasDraftProduct.id);
      if (branches.length > 0) {
        branches.forEach(branch => {
            if (branch) {
              this.model.delete(Tables.branchProducts, '"' + branch.id + '"');
           }
        });
      }
    }

  }

  updateBranch(): void {
    this.deleteAllBranches();
    if (this.hasDraftProduct && this.branchList.value.length > 0) {
      this.branchList.value.forEach(id => {
        this.model.create<BranchProducts>(Tables.branchProducts, {
          id: this.database.uid(),
          productId: this.hasDraftProduct.id,
          branchId: id
        });
      });
    }
  }

  update(): Product {
    if (this.hasDraftProduct) {
      return this.model.update<Product>(Tables.products, this.hasDraftProduct, this.hasDraftProduct.id);
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
    this.variant.deleteProductVariations(this.hasDraftProduct);
    this.deleteAllBranches();
    this.model.delete(Tables.products, '"' + this.hasDraftProduct.id + '"');

  }


updateOnlineDatabase() {
  if (PouchConfig.canSync) {
    this.database.sync(PouchConfig.syncUrl);
  }
  if (!this.hasDraftProduct.isDraft) {
    this.database.put(PouchConfig.Tables.products, {products: [this.hasDraftProduct]});
    this.database.put(PouchConfig.Tables.variants,
      {variants: this.model.filters<Variant>(Tables.variants, 'productId', this.hasDraftProduct.id)});
    this.database.put(PouchConfig.Tables.stocks,
      {stocks: this.model.filters<Stock>(Tables.stocks, 'productId', this.hasDraftProduct.id)});
    this.database.put(PouchConfig.Tables.branchProducts,
       {branchProducts: this.model.filters<BranchProducts>(Tables.branchProducts, 'productId', this.hasDraftProduct.id)});
    this.database.put(PouchConfig.Tables.stockHistories,
       {stockHistory: this.model.filters<StockHistory>(Tables.stockHistory, 'productId', this.hasDraftProduct.id)});

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

      await this.updateOnlineDatabase();
      }

    }





}
