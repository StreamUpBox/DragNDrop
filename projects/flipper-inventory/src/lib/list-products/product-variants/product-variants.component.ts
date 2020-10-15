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
  
  @Input() displayedColumns = [];
  @Input() showPagination = false;
  @Input()  showColums = false;

  @Input('allVariant')
  set allVariant(allVariant: Variant[]) {

    this.loading = true;
    this.loadAllVariants=allVariant;
  }

 

  dataSource: MatTableDataSource<Variant>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private subscription: Subscription;
  loading = true;

  constructor(public stock: StockService, public variant: VariationService) {
    this.dataSource = new MatTableDataSource([]);

   }

   ngOnInit() {
    // this.refresh();
  

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async refresh() {
    this.loading = true;
    this.loadAllVariants=await this.allVariant;
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
