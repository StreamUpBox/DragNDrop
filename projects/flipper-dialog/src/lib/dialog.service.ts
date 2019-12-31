import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { WaitDialogProgress } from './wait-dialog/wait-dialog-progress';
import { WaitDialogComponent } from './wait-dialog/wait-dialog.component';
import { DialogSize } from './dialog-size';
import { KeyBoardShortCutsComponent } from './key-board-short-cuts/key-board-short-cuts.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';

@Injectable()
export class DialogService {

  constructor(public dialog: MatDialog) {
  }

  public open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
                                   size: DialogSize = DialogSize.SIZE_SM,
                                   data?: D): Observable<R> {
    const dialogRef = this.dialog.open(componentOrTemplateRef, {
      panelClass: size,
      data
    });
    return dialogRef.afterClosed().pipe(filter((result: R) => result !== undefined));
  }




  public delete(name: string, items: string[], helpPageId?: any): Observable<void> {
    return this.open(DeleteDialogComponent, DialogSize.SIZE_MD, {
      name,
      items,
      helpPageId,
    });
  }

  public confirm(title: string, message: string): Observable<void> {
    return this.open(ConfirmDialogComponent, DialogSize.SIZE_MD, {
      title,
      message
    });
  }

  public message(title: string, message: string, status: string, size= 'SIZE_MD'): Observable<void> {
    return this.open(MessageDialogComponent,   DialogSize[size], {
      title,
      message,
      status
    });
  }

  public keyBoardShortCuts(size= 'SIZE_MD'): Observable<void> {
    return this.open(KeyBoardShortCutsComponent, DialogSize[size], {});
  }

  public wait(progress: WaitDialogProgress): MatDialogRef<WaitDialogComponent, void> {
    return this.dialog.open(WaitDialogComponent, {
      panelClass: DialogSize.SIZE_MD,
      data: progress,
      disableClose: true,
    });
  }
}
