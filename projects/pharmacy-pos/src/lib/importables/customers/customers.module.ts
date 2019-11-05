import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CrupdateCustomerModelComponent } from './manage-customer/manage-customer.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerRoutingModule } from './customer-routing.module';
import { DataTableModule } from '../data-table/data-table/data-table.module';
import { SelectCustomerModelComponent } from './manage-customer/select-customer-model/select-customer-model.component';
import { CustomersComponent } from './customer/customer.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { UiModule } from '../ui/ui.module';
import { HttpModule } from '../http/http.module';
import { CustomerTypeComponent } from '../customerType/customertype.component';
import { AttachItemCustomerTypesModelComponent } from '../customerType/attach-item-customer-types-model/attach-item-customer-types-model.component';
import { CrupdateCustomerTypeModalComponent } from '../customerType/crupdate-customet-type-modal/crupdate-customer-type-modal.component';
import { SelectCustomerTypeModelComponent } from '../customerType/select-customer-type-model/select-customer-type-model.component';
import { SelectCustomerTypeModalComponent } from '../select-customer-type-modal/select-customer-type-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    UiModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    CustomerRoutingModule,
    DataTableModule
  ],
  declarations: [SelectCustomerTypeModalComponent,CustomersComponent, CrupdateCustomerModelComponent, SelectCustomerModelComponent,CustomerTypeComponent,
    AttachItemCustomerTypesModelComponent,CrupdateCustomerTypeModalComponent,SelectCustomerTypeModelComponent],
  exports: [
    CustomersComponent,
    CrupdateCustomerModelComponent,
    SelectCustomerModelComponent,
    CustomerTypeComponent,
    AttachItemCustomerTypesModelComponent,CrupdateCustomerTypeModalComponent,SelectCustomerTypeModelComponent],
  entryComponents: [CrupdateCustomerModelComponent,SelectCustomerModelComponent,AttachItemCustomerTypesModelComponent,CrupdateCustomerTypeModalComponent,SelectCustomerTypeModelComponent],
  bootstrap: [CustomersComponent],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class CustomersModule { }
