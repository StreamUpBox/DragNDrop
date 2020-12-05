import { NgModule } from '@angular/core'
import { ProductsComponent } from './products/products.component'
import { CreateProductComponent } from './create-product/create-product.component'
import { CommonModule } from '@angular/common'
import { VariantsComponent } from './variants/variants.component'
import { RegularVariantsComponent } from './variants/regular-variants/regular-variants.component'
import { AddedVariantsComponent } from './variants/added-variants/added-variants.component'
import { VariantsDialogModelComponent } from './variants/variants-dialog-model/variants-dialog-model.component'
import { EditVariantComponent } from './variants/edit-variant/edit-variant.component'
import { DisacrdDialogModelComponent } from './products/disacrd-dialog-model/disacrd-dialog-model.component'
import { ManageStockComponent } from './manage-stock/manage-stock.component'
import { AddVariantComponent } from './variants/add-variant/add-variant.component'
import { ListProductsComponent } from './list-products/list-products.component'
import { ProductVariantsComponent } from './list-products/product-variants/product-variants.component'
import { ViewStockHistoryComponent } from './view-stock-history/view-stock-history.component'
import { PrintBarcodeLabelsDialogComponent } from './print-barcode-labels-dialog/print-barcode-labels-dialog.component'
import { VendorsModule } from '@enexus/flipper-vendors'
import { FlipperEventModule } from '@enexus/flipper-event'
import { FlipperComponentsModule } from '@enexus/flipper-components'
import { DialogModule } from '@enexus/flipper-dialog'

import { FlipperFileUploadModule } from '@enexus/flipper-file-upload'

@NgModule({
  declarations: [
    ProductVariantsComponent,
    ListProductsComponent,
    VariantsComponent,
    ProductsComponent,
    CreateProductComponent,
    RegularVariantsComponent,
    AddedVariantsComponent,
    VariantsDialogModelComponent,
    EditVariantComponent,
    DisacrdDialogModelComponent,
    ManageStockComponent,
    AddVariantComponent,

    ViewStockHistoryComponent,
    PrintBarcodeLabelsDialogComponent,
  ],
  imports: [
    CommonModule,
    VendorsModule,
    FlipperEventModule,
    FlipperComponentsModule,

    FlipperFileUploadModule,
    DialogModule,
  ],
  entryComponents: [
    VariantsDialogModelComponent,
    DisacrdDialogModelComponent,
    AddVariantComponent,

    ViewStockHistoryComponent,
    PrintBarcodeLabelsDialogComponent,
  ],
  exports: [
    VariantsComponent,
    ProductsComponent,
    CreateProductComponent,
    RegularVariantsComponent,
    AddedVariantsComponent,
    VariantsDialogModelComponent,
    EditVariantComponent,
    DisacrdDialogModelComponent,
    ManageStockComponent,
    AddVariantComponent,
    ListProductsComponent,
    ProductVariantsComponent,
    ViewStockHistoryComponent,
    PrintBarcodeLabelsDialogComponent,
  ],
})
export class FlipperInventoryModule {}
