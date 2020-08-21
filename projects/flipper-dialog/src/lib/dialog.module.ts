import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { WaitDialogComponent } from './wait-dialog/wait-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { DialogService } from './dialog.service';
import { VendorsModule } from '@enexus/flipper-vendors';
import { KeyBoardShortCutsComponent } from './key-board-short-cuts/key-board-short-cuts.component';
import { MessageTypeComponent } from './message-type/message-type.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    VendorsModule
  ],
  declarations: [
    DeleteDialogComponent,
    WaitDialogComponent,
    ConfirmDialogComponent,
    KeyBoardShortCutsComponent,
    MessageTypeComponent,
    MessageDialogComponent,
  ],
  exports: [
    DeleteDialogComponent,
    WaitDialogComponent,
    ConfirmDialogComponent,
    KeyBoardShortCutsComponent,
    MessageDialogComponent,
    MessageTypeComponent
  ],
  entryComponents: [
    DeleteDialogComponent,
    WaitDialogComponent,
    ConfirmDialogComponent,
    KeyBoardShortCutsComponent,
    MessageDialogComponent
  ],
  providers: [
    DialogService,
  ]
})
export class DialogModule { }
