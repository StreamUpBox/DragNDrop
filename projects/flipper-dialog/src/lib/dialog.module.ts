import { FontModule } from '@enexus/flipper-font';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { WaitDialogComponent } from './wait-dialog/wait-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { DialogService } from './dialog.service';
import { VendorsModule } from '@enexus/flipper-vendors';
import { KeyBoardShortCutsComponent } from './key-board-short-cuts/key-board-short-cuts.component';
@NgModule({
  imports: [
    CommonModule,
    FontModule, // TODO:rename the module to FlipperFontModule
    VendorsModule
  ],
  declarations: [
    DeleteDialogComponent,
    WaitDialogComponent,
    ConfirmDialogComponent,
    KeyBoardShortCutsComponent,
  ],
  exports: [
    DeleteDialogComponent,
    WaitDialogComponent,
    ConfirmDialogComponent,
    KeyBoardShortCutsComponent
  ],
  entryComponents: [
    DeleteDialogComponent,
    WaitDialogComponent,
    ConfirmDialogComponent,
    KeyBoardShortCutsComponent
  ],
  providers: [
    DialogService,
  ]
})
export class DialogModule { }
