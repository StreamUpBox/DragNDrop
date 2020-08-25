import { Injectable } from '@angular/core';
import { MainModelService, Tables, Variant, SettingsService, Business,
         Branch, Product, StockHistory, Labels, PouchDBService, Stock } from '@enexus/flipper-components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VariantsDialogModelComponent } from '../variants/variants-dialog-model/variants-dialog-model.component';
import { DialogService,  } from '@enexus/flipper-dialog';
import { StockService } from './stock.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ViewStockHistoryComponent } from '../view-stock-history/view-stock-history.component';
import { PrintBarcodeLabelsDialogComponent } from '../print-barcode-labels-dialog/print-barcode-labels-dialog.component';
import { DialogSize } from '@enexus/flipper-dialog';


@Injectable({
  providedIn: 'root'
})
export class VariationService {
  hasRegular: Variant = null;
  myAllVariants: Variant[] = [];
  SKU = '';
  d = new Date();
  units: any[] = [];
  form: FormGroup;
  product: Product;
  variantsSubject: BehaviorSubject<Variant[]>;
  private readonly variantsMap = new Map<string, Variant>();
  set allVariants(variants: Variant[]) {
    this.myAllVariants = variants;
  }
  get allVariants(): Variant[] {
      return this.myAllVariants;
  }

  variantStock = { length: 0, currentStock: 0, lowStock: 0 };
  constructor(private stock: StockService, private dialog: DialogService,
              private model: MainModelService,
              private setting: SettingsService,
              private formBuilder: FormBuilder,
              private database: PouchDBService) {
    this.variantsSubject = new BehaviorSubject([]);
    this.units = this.setting.units();
  }

  public loadAllVariants(product: Product): Observable<Variant[]> {
    const data: Variant[] = [];
    this.allVariant(product).forEach(d => data.push(d as Variant));
    this.variantsSubject.next(data);
    this.variantsMap.clear();
    data.forEach(variant => this.variantsMap.set(variant.id as any, variant));
    return of(data);
  }

  public host(id: string): Variant | undefined {
    return this.variantsMap.get(id);
  }

  init(product: Product): void {

    // TODO: swap the bellow functions regular,createRegular,variants,stockUpdate to use pouch instead of alasql
    if (product) {
      this.product = product;
      this.regular(product);
      this.createRegular(product);
      this.variants(product);
      this.stockUpdates();
    }


  }

  public activeBusiness(): Business {
    return this.model.active<Business>(Tables.business);
  }
  updateDefaultUnit(variation: Variant, key: string, id: string): void {
    this.updateRegularVariant(variation, key, id);


  }

  findVariant(variantId: string) {
    return this.model.find<Variant>(Tables.variants, variantId);
  }

  findFirst(productId: string): Variant {
    return this.model.findByFirst<Variant>(Tables.variants, 'productId', productId);
  }

  request(action = null, variant = null): void {
    // console.log(variant);
    const stock: Stock = variant ? this.stock.findVariantStock(variant ? variant.id : null) : null;
    this.form = this.formBuilder.group({
      name: [!action && variant && variant.name ? variant.name : '', Validators.required],
      SKU: !action && variant && variant.SKU ? variant.SKU : this.generateSKU(),
      retailPrice: [!action && variant && stock ? stock.retailPrice : 0.00, Validators.min(0)],
      supplyPrice: [!action && variant && stock ? stock.supplyPrice : 0.00, Validators.min(0)],
      unit: !action && variant && variant.unit ? variant.unit : '',
      createdAt: new Date(),
      updatedAt: new Date(),

    });
  }

  generateSKU(): string {
    return this.d.getFullYear() + '' + this.makeid(4);
  }

  makeid(length: number) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  create(variant: Variant): Variant | Variant[] {
    return this.model.create<Variant>(Tables.variants, variant);
  }

  createRegular(product: Product): void {



    if (!this.hasRegular) {
      const formData = {
        id: this.database.uid(),
        name: 'Regular',
        productName: product.name,
        categoryName: '',
        productId: product.id,
        supplyPrice: 0.00,
        retailPrice: 0.00,
        unit: this.units.length > 0 ? this.units[0].value : '',
        SKU: this.generateSKU(),
        syncedOnline: false,
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()

      };
      this.create(formData);
      this.createVariantStock(formData);
      this.regular(product);
    }

  }

  createVariantStock(formData: any) {
    this.stock.createStocks(formData,
      this.model.filters<Branch>(Tables.branch, 'businessId',
        this.model.active<Business>(Tables.business).id)
    );
  }


  variants(product: Product): void {
    this.allVariants = [];
    this.allVariants = this.model.filters<Variant>(Tables.variants, 'productId', product.id);
  }

  productStockHistory(product: Product): StockHistory[] {
    const variantIds: string[] = [];
    this.allVariant(product).forEach(sh => {
      variantIds.push(`'${sh.id}'`);
    });
    return this.stock.productStockHistory(variantIds);
  }


  allVariant(product: Product): Variant[] {
    return this.model.filters<Variant>(Tables.variants, 'productId', product.id);
  }
  get formControl() { return this.form.controls; }

  regular(product: Product): void {

    this.hasRegular = this.model.findByLast<Variant>(Tables.variants, 'productId', product.id);
  }



  updateRegularVariant(variation: Variant, key: string, val: any): void {
    if (variation) {
      if (key === 'SKU' && val === '') {
        val = variation.SKU;
      }

      variation[key] = val;
    }
    // variation.productName = this.model.draft<Product>(Tables.products, 'isDraft').name;
    this.update(variation);
  }


  update(variation: Variant): void {
    if (variation) {
      this.model.update<Variant>(Tables.variants, variation, variation.id);
    }

  }
  deleteAllVariantsDialog(product: Product) {
    const variants = [];
    const p  =  this.model.draft<Product>(Tables.products, 'isDraft');
    const allVariants = this.model.filters<Variant>(Tables.variants, 'productId', p.id);
    allVariants.forEach((v, i) => {
      variants.push(`${i + 1}. ${v.name}`);
    });
    this.dialog.delete('Variants', variants).subscribe(confirm => {
      this.deleteProductVariations(p);
      this.init(p);
    });
  }

  public openVariantDialog(variant: Variant, selectedIndex: number): any {
    return this.dialog.open(VariantsDialogModelComponent, DialogSize.SIZE_MD, { variant, selectedIndex }).subscribe(result => {

       this.updateStockControl(result, variant);
       this.regular(this.product);
       this.request(null, variant);
       this.variants(this.product);
       this. stockUpdates();
    });
  }

updateStockControl(result: any, variant: Variant) {
  if (result) {
    if (result.length > 0) {
      result.forEach(res => {
        if (res.reason && res.currentStock > 0) {
          this.stock.createHistory({
            id: this.database.uid(),
            orderId: 0,
            variantId: variant.id,
            productId: this.findVariant(variant.id).productId,
            stockId: res.id,
            reason: res.reason,
            quantity: res.currentStock,
            note: res.reason,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
          // update Stock
        const stock = this.stock.findStock(res.id);
        if (res.reason && res.currentStock > 0) {

            if (res.reason === 'Received' || res.reason === 'Restocked') {

              if (!(res.currentStock === 0 || res.currentStock === null)) {
                stock.currentStock = stock.currentStock + res.currentStock;
               }

            } else if (res.reason === 'Re-counted') {

                  if (!(res.currentStock === 0 || res.currentStock === null)) {
                    stock.currentStock = res.currentStock;
                   }
            } else {
              if (!(res.currentStock === 0 || res.currentStock === null)) {
                    stock.currentStock = stock.currentStock - res.currentStock;
              }

            }

          } else {
            res.currentStock = stock.currentStock;
          }

        if (res.currentStock === 0 || res.currentStock === null || res.currentStock === '') {
               stock.currentStock = stock.currentStock;
          }

        stock.canTrackingStock = res.canTrackingStock;
        stock.lowStock = res.lowStock;
        stock.showLowStockAlert = res.showLowStockAlert;


        this.stock.update(stock);

      });
    }
  }
}

  public openStockHistoryDialog(variant: any= null, isArray= false): any {
    return this.dialog.open(ViewStockHistoryComponent, DialogSize.SIZE_LG, {variant, isArray}).subscribe();
  }

  public openPrintBarcodeLablesDialog(): any {
    const labels: Labels[] = [];
    const product  =  this.model.draft<Product>(Tables.products, 'isDraft');
    const allVariants = this.model.filters<Variant>(Tables.variants, 'productId', product.id);
    allVariants.forEach(v => {
      labels.push({name: v.name, sku: v.SKU});
    });
    return this.dialog.open(PrintBarcodeLabelsDialogComponent, DialogSize.SIZE_LG, labels).subscribe();
  }



  deleteProductVariations(product: Product): void {
    if (product) {

      const variations: Variant[] = this.model.filters<Variant>(Tables.variants, 'productId', product.id);
      if (variations.length > 0) {
        variations.forEach(variation => {
          this.stock.deleteStocks(variation);
          this.stock.deleteStocksHistory(variation);
          this.model.delete(Tables.variants, '"' + variation.id + '"');
        });
      }
    }

  }


  deleteVariations(): void {
    const variations: Variant[] = this.model.loadAll<Variant>(Tables.variants);
    if (variations.length > 0) {
      variations.forEach(variation => {
        this.stock.deleteStocks(variation);
        this.stock.deleteStocksHistory(variation);
        this.model.delete(Tables.variants, '"' + variation.id + '"');
      });
    }
  }

  deleteVariation(variant: Variant, product: Product): void {
    if (variant) {
      this.dialog.delete('Variant', [`Variant: ${variant.name}`]).subscribe(confirm => {
        this.stock.deleteStocks(variant);
        this.stock.deleteStocksHistory(variant);
        this.model.delete(Tables.variants, `'${variant.id}'`);
        this.init(product);
      });


    }
  }



  stockUpdates(): void {
    if (this.hasRegular) {
      const stock = this.stock.variantStocks(this.hasRegular.id);
      this.variantStock = {
        length: stock.length,
        lowStock: stock.length > 0 ? stock[0].lowStock : 0,
        currentStock: stock.length > 0 ? stock[0].currentStock : 0
      };
    }
  }

  updateVariant(key: any, variant: Variant, event: any) {
    const val = key === 'unit' ? event.value : event.target.value;

    if (key === 'retailPrice' || key === 'supplyPrice') {
      const myStock = this.stock.findVariantStock(variant.id);
      myStock[key] = parseInt(val, 10);
      this.stock.update(myStock);
    } else {
      this.updateRegularVariant(variant, key, val);
    }
  }

  updateVariantAction(product: Product) {
    const variants: Variant[] = this.model.filters<Variant>(Tables.variants, 'productId', product.id);
    if (variants.length > 0) {
      variants.forEach(variant => {
        this.stock.updateStockHistoryAction(variant.id);
        variant.isActive = true;
        this.update(variant);
      });
    }
  }

}


