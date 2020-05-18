import { Component, OnInit, ViewChild, OnDestroy, Input, NgZone } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product, Stock, CalculateTotalClassPipe, Variant,
   MigrateService, PouchConfig, PouchDBService, Tables,
    StockHistory } from '@enexus/flipper-components';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { VariationService } from '../services/variation.service';
import { StockService } from '../services/stock.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'flipper-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListProductsComponent implements OnInit, OnDestroy {

  readonly displayedColumns: string[] = ['name', 'sku', 'soldby', 'inStock', 'retailprice', 'supplyprice'];
  loading = true;
  dataSource: MatTableDataSource<Product>;
  expandedElement: Product | null;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private subscription: Subscription;

  searching: string;
  @Input('applySearch')
  set applySearch(value: string) {
    this.searching = value;
    this.applyFilter(value);
  }

  get applySearch(): string {
    return this.searching;
  }


  constructor(private router: Router,
              private totalPipe: CalculateTotalClassPipe,
              private stock: StockService,
              public variant: VariationService,
              private migrate: MigrateService,
              private database: PouchDBService,
              public product: ProductService,
              private ngZone: NgZone) {
    this.database.connect(PouchConfig.bucket);
    this.dataSource = new MatTableDataSource([]);

    this.subscription = this.product.productsSubject.
    subscribe((loadAllProducts) => this.loadAllProducts = loadAllProducts);
   }

   ngOnInit() {
    if (PouchConfig.canSync) {
      this.database.sync(PouchConfig.syncUrl);
    }
    this.database.getChangeListener().subscribe(data => {

      if (data && data.change && data.change.docs) {
              for (const doc of data.change.docs) {
                this.ngZone.run(() => {

                  if (doc && doc._id === PouchConfig.Tables.products) {
                    doc.products.forEach(row => {
                      const form: Product = row as Product;
                      this.migrate.insertDataIntoAlsql<Product>(Tables.products, form, form.id);
                     });
                    this.refresh();

                  }
                  // console.log(doc);
                  if (doc && doc._id === PouchConfig.Tables.variants) {
                    doc.variants.forEach(row => {
                      const form: Variant = row as Variant;
                      this.migrate.insertDataIntoAlsql<Variant>(Tables.variants, form, form.id);
                     });
                    this.refresh();

                  }
                  if (doc && doc._id === PouchConfig.Tables.stocks) {
                    doc.stocks.forEach(row => {
                      const form: Stock = row as Stock;
                      this.migrate.insertDataIntoAlsql<Stock>(Tables.stocks, form, form.id);
                     });
                    this.refresh();
                  }
                  if (doc && doc._id === PouchConfig.Tables.stockHistories) {
                    doc.stockHistory.forEach(row => {
                      const form: StockHistory = row as StockHistory;
                      this.migrate.insertDataIntoAlsql<StockHistory>(Tables.stockHistory, form, form.id);
                     });
                    this.refresh();
                  }


                });
              }
            }
        });

    this.refresh();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refresh() {
    this.loading = true;
    this.product.loadAllProducts().subscribe();
  }

  applyFilter(filterValue: string) {
    if (filterValue) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    } else {
      this.refresh();
    }

  }




  set loadAllProducts(hosts: Product[]) {
    this.dataSource = new MatTableDataSource(hosts);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loading = false;
  }

  editProduct(product: Product) {
    product.isDraft = true;
    product.isCurrentUpdate = true;
    this.product.updateProduct(product);
    this.router.navigate(['/add/product']);
  }


  getTotalStock(product: Product): number {
        if (this.getStock(product).length > 0) {
          return this.totalPipe.transform(this.getStock(product), 'currentStock');
        } else {
            return 0;
        }
    }
    getStock(product: Product): Stock[] {
      const stocks: Stock[] = [];
      const variants = this.variant.allVariant(product);
      if (variants.length > 0) {
                variants.forEach(variant => {
                  stocks.push(this.stock.findVariantStock(variant.id));
                });
            }
      return stocks;
    }



    getStockPrice(product: Product, type: string): any {
        if (this.getStock(product).length > 0) {
              if (this.getStock(product).length > 1) {
                  return this.getStock(product).length + ' Prices';
              } else {
                return this.variant.activeBusiness().currency + ' ' + this.getStock(product)[0][type];
              }
          } else {
              return 0;
          }

      }

}
