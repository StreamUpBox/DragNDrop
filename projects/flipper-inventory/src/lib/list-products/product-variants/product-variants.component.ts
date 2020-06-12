import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Variant, Product } from '@enexus/flipper-components';

import { Subscription } from 'rxjs';
import { StockService } from '../../services/stock.service';
import { VariationService } from '../../services/variation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'flipper-product-variants',
  templateUrl: './product-variants.component.html',
  styleUrls: ['./product-variants.component.css']
})
export class ProductVariantsComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  @Input() displayedColumns = [];
  @Input() showPagination = false;
  @Input()  showColums = false;
  dataSource: MatTableDataSource<Variant>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private subscription: Subscription;
  loading = true;

  constructor(public stock: StockService, public variant: VariationService) {
    this.dataSource = new MatTableDataSource([]);

   }

   ngOnInit() {
    this.refresh();
    if (this.product) {
      this.subscription = this.variant.variantsSubject.subscribe((loadAllVariants) => this.loadAllVariants = loadAllVariants);
   }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refresh() {
    this.loading = true;

    if (this.product) {
      this.variant.loadAllVariants(this.product).subscribe();
    }
  }

  set loadAllVariants(variants: Variant[]) {
    this.dataSource = new MatTableDataSource(variants);
    this.dataSource.sort = this.sort;
    if (this.showPagination) {
      this.dataSource.paginator = this.paginator;
    }

    this.loading = false;
  }
}
