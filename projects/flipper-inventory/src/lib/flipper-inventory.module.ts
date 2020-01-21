import { NgModule } from '@angular/core';
import { FlipperInventoryComponent } from './flipper-inventory.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { CommonModule } from '@angular/common';
import { VendorsModule } from '@enexus/flipper-vendors';
import { FlipperEventModule } from '@enexus/flipper-event';
import { FlipperComponentsModule } from '@enexus/flipper-components';



@NgModule({
  declarations: [FlipperInventoryComponent, ProductsComponent, CreateProductComponent],
  imports: [
    CommonModule,
    VendorsModule,
    FlipperEventModule,
    FlipperComponentsModule
  ],
  exports: [FlipperInventoryComponent, ProductsComponent, CreateProductComponent]
})
export class FlipperInventoryModule { }
