import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import { NgxsModule } from '@ngxs/store';
import { PosOrderState } from '../store/states/PosOrderStates';
import { MaterialModule } from '../material/material.module';
import { PrintReceiptModelComponent } from './print-receipt-model/print-receipt-model.component';
import { PipeModuleModule } from '../pipe-module/pipe-module.module';
import { InvoicePreviewComponent } from './invoice-preview/invoice-preview.component';

@NgModule({
  declarations: [PrintInvoiceComponent, PrintReceiptModelComponent,InvoicePreviewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PipeModuleModule,
    NgxsModule.forRoot([PosOrderState]),
  ],
  entryComponents: [PrintReceiptModelComponent,InvoicePreviewComponent],
  exports: [PrintInvoiceComponent,PrintReceiptModelComponent],
})
export class PrintOutModule {

}
