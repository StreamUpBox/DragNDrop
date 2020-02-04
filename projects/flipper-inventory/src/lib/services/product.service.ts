import { Injectable } from '@angular/core';
import { Product, MainModelService, Tables, Business, Branch, Taxes, BranchProducts } from '@enexus/flipper-components';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { DialogService, DialogSize } from '@enexus/flipper-dialog';
import { DisacrdDialogModelComponent } from '../products/disacrd-dialog-model/disacrd-dialog-model.component';
import { VariationService } from './variation.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
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


  constructor(private dialog: DialogService, private model: MainModelService,
     private variant: VariationService, private formBuilder: FormBuilder) {
      this.productsSubject = new BehaviorSubject([]);
  }

  init(): void {
    this.branches$ = this.model.loadAll<Branch>(Tables.branch);
    this.taxes$ = this.model.loadAll<Taxes>(Tables.taxes);

    this.create();
    this.loadBranches();
  }

  public loadAllProducts(): Observable<Product[]> {
    const data: Product[] = [];
    this.model.loadAll<Product>(Tables.products).forEach(d => data.push(d as Product));
    this.productsSubject.next(data);
    this.productsMap.clear();
    data.forEach(product => this.productsMap.set(product.id as any, product));
    return of(data);
  }

  public host(id: string): Product | undefined {
    return this.productsMap.get(id);
  }


  request(): void {
    this.form = this.formBuilder.group({
      name: [this.hasDraftProduct && this.hasDraftProduct.name && this.hasDraftProduct.name === 'new item' ? ''
       : this.hasDraftProduct.name, Validators.required],
      categoryId: this.hasDraftProduct && this.hasDraftProduct.categoryId ? this.hasDraftProduct.categoryId : 0,
      description: this.hasDraftProduct && this.hasDraftProduct.description ? this.hasDraftProduct.description : '',
      picture: this.hasDraftProduct && this.hasDraftProduct.picture ? this.hasDraftProduct.picture : '',
      taxId: this.hasDraftProduct && this.hasDraftProduct.taxId ? this.hasDraftProduct.taxId : '',
      supplierId: this.hasDraftProduct && this.hasDraftProduct.supplierId ? this.hasDraftProduct.supplierId : 0,
      createdAt: new Date(),
      updatedAt: new Date(),

    });
  }

  get formControl() { return this.form.controls; }

  hasDraft(): void {
    this.hasDraftProduct = this.model.draft<Product>(Tables.products, 'isDraft');
  }

  create(): void {
    if (!this.hasDraftProduct) {
      this.model.create<Product>(Tables.products, {
        name: 'new item',
        businessId: this.model.active<Business>(Tables.business).id,
        isDraft: true,
        active: false,
        isCurrentUpdate: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      this.hasDraft();
      if (this.taxes$.length > 0) {
          this.updateTax('taxId', this.taxes$[0].id);
      }

    }
  }

  updateTax(key: string, id: number) {
    this.updateKeyValue(key, id);
    this.update();

}

  canAddProduct(): void {
    this.enableToAdd = localStorage.getItem('userIsCreatingAnItem') === 'true' ? true : false;
  }

  allowToAddProduct(bol: boolean): void {
    this.enableToAdd = bol;
    localStorage.setItem('userIsCreatingAnItem', `${bol}`);
  }



  loadBranches(): void {
    let arr = [];
    if (this.hasDraftProduct) {
      arr = this.model.filters<BranchProducts>(Tables.branchProducts, 'productId', this.hasDraftProduct.id);

      if (arr.length === 0) {
        this.model.create<BranchProducts>(Tables.branchProducts, {
          productId: this.hasDraftProduct.id,
          branchId: this.model.active<Branch>(Tables.branch).id
        });

        this.branchList.setValue([this.model.active<Branch>(Tables.branch).id]);


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
              this.model.delete(Tables.branchProducts, branch.id);
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
    this.model.delete(Tables.products, this.hasDraftProduct.id);

  }

  deleteProduct() {
    if (this.hasDraftProduct) {
      this.dialog.delete('Product', [`${this.hasDraftProduct.name}`]).subscribe(confirm => {
        this.discardProduct();
        this.allowToAddProduct(false);
       });
    }


  }



  saveProduct() {
    if (this.hasDraftProduct) {
      this.variant.updateVariantAction(this.hasDraftProduct);
      this.hasDraftProduct.active = true;
      this.hasDraftProduct.isDraft = false;
      this.hasDraftProduct.isOnPos = true;
      this.hasDraftProduct.isCurrentUpdate = false;
      this.hasDraftProduct.updatedAt = new Date();
      this.update();
      this.allowToAddProduct(false);

    }
  }

  public openDiscardDialog() {
    if (this.hasDraftProduct && this.hasDraftProduct.isCurrentUpdate) {
      this.saveProduct();
    } else {
      return this.dialog.open(DisacrdDialogModelComponent, DialogSize.SIZE_MD).subscribe(result => {

        if (result == 'discard') {
          this.discardProduct();
          this.allowToAddProduct(false);
        }

        if (result == 'save') {
            this.saveProduct();
        }
      });
    }

 }

}
