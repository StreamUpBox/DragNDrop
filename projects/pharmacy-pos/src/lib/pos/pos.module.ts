import {
  NgModule, ModuleWithProviders, APP_INITIALIZER, ErrorHandler,
} from "@angular/core";
import { CoreModule } from '../importables/core.module';
import { Bootstrapper, init_app } from '../importables/bootstrapper.service';
import { CurrentUser } from '../importables/auth/current-user';
import { APP_CONFIG, DEFAULT_FLIPPER_CONFIG } from '../importables/config/flipper-config';
import { HttpErrorHandler } from '../importables/http/errors/http-error-handler.service';
import { BackendHttpErrorHandler } from '../importables/http/errors/backend-http-error-handler.service';
import { Settings } from '../importables/types/models/User';
import { HttpClientModule } from '@angular/common/http';
import { SalePointComponent } from './sale-point/sale-point.component';
import { SessionsComponent } from './sessions/sessions.component';
import { UiModule } from '../importables/ui/ui.module';
import { MaterialModule } from '../importables/material/material.module';
import { PosRoutingModule } from './pos-routing.module';
import { PrintOutModule } from '../importables/print-out/print-out.module';
import { CustomersModule } from '../importables/customers/customers.module';
import { PosProductsComponent } from './pos/load-item/pos-products/pos-products.component';
import { ItemCategoriesComponent } from './pos/load-item/item-categories/item-categories.component';
import { BottomSheetOverviewStock } from './pos/boottom-sheet-stock-movement/bottom-sheet-of-stock.componet';
import { SelectCustomerModelComponent } from '../importables/customers/manage-customer/select-customer-model/select-customer-model.component';
import { SelectCustomerTypeModalComponent } from '../importables/select-customer-type-modal/select-customer-type-modal.component';
import { DataTableModule } from '../importables/data-table/data-table/data-table.module';
import { PipeModuleModule } from '../importables/pipe-module/pipe-module.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '../importables/http/http.module';
import { TranslationsModule } from '../importables/translations/translations.module';
import { NgxsModule } from '@ngxs/store';
import { PosCateoriesState } from '../importables/store/states/PosCategoryStates';
import { PosStockStates } from '../importables/store/states/PosStockStates';
import { PosOrderState } from '../importables/store/states/PosOrderStates';
import { PosSearchBarComponent } from './pos-search-bar/pos-search-bar.component';
import { PosSearchStockStates } from '../importables/store/states/PosSearchStockStates';
import { CommonModule } from '@angular/common';
import { PosComponent } from './pos/pos.component';
import { CartItemComponent, CartDialog } from './cart-item/cart-item.component';
import { TaxRatesComponent } from '../importables/tax-rates/tax-rates.component';
import { CrupdateTaxRateModalComponent } from '../importables/tax-rates/crupdate-tax-rate-modal/crupdate-tax-rate-modal.component';
import { SelectTaxrateModalComponent } from '../importables/tax-rates/select-taxrate-modal/select-taxrate-modal.component';
import { CustomerTypeComponent } from '../importables/customerType/customertype.component';
import { PosInfiniteScrollDirective } from './pos/pos-infinite-scroll.directive';
import { ListItemHeaderComponent } from './pos/list-item-header/list-item-header.component';
import { ApiPosService } from './api/api.service';


@NgModule({
  declarations: [
    SalePointComponent,
    SessionsComponent,
    PosComponent,
    CartItemComponent,
    ItemCategoriesComponent,
    CartDialog,
    BottomSheetOverviewStock,
    PosInfiniteScrollDirective,
    PosProductsComponent,
     ListItemHeaderComponent,
    PosSearchBarComponent,
     SelectTaxrateModalComponent,
     TaxRatesComponent,
    CrupdateTaxRateModalComponent
  ],
  imports: [
     CommonModule,
     HttpClientModule,
    MaterialModule,
    PosRoutingModule,
    PrintOutModule,
    CustomersModule,
    UiModule,
    HttpModule,
    PipeModuleModule,
    FlexLayoutModule,
    DataTableModule,
    TranslationsModule,
    NgxModelModule,
    NgxsModule.forRoot([
      PosCateoriesState,
      PosStockStates,
      PosSearchStockStates,
      PosOrderState
    ])
  ],
  exports: [
    SessionsComponent,
    SalePointComponent,
    PosComponent,
    CartDialog,
    ItemCategoriesComponent,
    BottomSheetOverviewStock,
    PosInfiniteScrollDirective
  ],
  entryComponents: [CartDialog, BottomSheetOverviewStock, SelectTaxrateModalComponent, SelectCustomerTypeModalComponent, CrupdateTaxRateModalComponent],
   providers: [ApiPosService],
  bootstrap: [PosComponent]
})

export class PosModule {

  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: PosModule,
  //     providers: [
  //       Bootstrapper,
  //       CurrentUser,
  //       {
  //         provide: APP_CONFIG,
  //         useValue: DEFAULT_FLIPPER_CONFIG,
  //         multi: true,
  //       },
  //       {
  //         provide: HttpErrorHandler,
  //         useClass: BackendHttpErrorHandler,
  //       },
  //       {
  //         provide: APP_INITIALIZER,
  //         useFactory: init_app,
  //         deps: [Bootstrapper],
  //         multi: true,
  //       },
  //       {
  //         provide: ErrorHandler,
  //         // useFactory: ravenErrorHandlerFactory,
  //         deps: [Settings, CurrentUser],
  //       },
  //     ]
  //   };
  // }
  //FIXME: when you uncomment me I error out!
  // constructor(public g: GlobalVariables) {
  // this.g.checkInternet();
  // }
}
