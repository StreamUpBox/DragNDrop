import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product, Stock, CalculateTotalClassPipe, Variant } from '@enexus/flipper-components';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { VariationService } from '../services/variation.service';
import { StockService } from '../services/stock.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

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


  constructor(private totalPipe: CalculateTotalClassPipe, private stock: StockService,
              public variant: VariationService, public product: ProductService) {
    this.dataSource = new MatTableDataSource([]);
    this.subscription = this.product.productsSubject.
    subscribe((loadAllProducts) => this.loadAllProducts = loadAllProducts);
   }

   ngOnInit() {
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
    this.product.allowToAddProduct(true);
    product.isDraft = true;
    product.isCurrentUpdate = true;
    this.product.updateProduct(product);
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
              stocks.push(this.stock.findStock(variant.id));
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
