import { Component, Inject, HostListener } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { WaitDialogProgress } from './wait-dialog-progress'

@Component({
  selector: 'lib-wait-dialog',
  templateUrl: './wait-dialog.component.html',
  styleUrls: ['./wait-dialog.component.scss'],
})
export class WaitDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) progress: WaitDialogProgress,
    public dialogRef: MatDialogRef<WaitDialogComponent>
  ) {
    this.progress = progress
  }

  set progress(progress: WaitDialogProgress) {
    this.ps = progress
  }

  get progress(): WaitDialogProgress {
    return this.ps
  }
  private ps: WaitDialogProgress
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Esc' || event.key === 'Enter') {
      this.dialogRef.close()
    }
  }
}
