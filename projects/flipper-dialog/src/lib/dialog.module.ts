import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { WaitDialogComponent } from './wait-dialog/wait-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {VendorsModule} from '@enexus/flipper-vendors';
import { DialogService } from './dialog.service';
@NgModule({
  imports: [
    CommonModule,
    VendorsModule
  ],
  declarations: [
    DeleteDialogComponent,
    WaitDialogComponent,
    ConfirmDialogComponent,
  ],
  exports: [
    DeleteDialogComponent,
    WaitDialogComponent,
    ConfirmDialogComponent,
  ],
  entryComponents: [
    DeleteDialogComponent,
    WaitDialogComponent,
    ConfirmDialogComponent,
  ],
  providers: [
    DialogService,
  ]
})
export class DialogModule { }
