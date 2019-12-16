import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WaitDialogProgress } from './wait-dialog-progress';

@Component({
  selector: 'lib-wait-dialog',
  templateUrl: './wait-dialog.component.html',
  styleUrls: ['./wait-dialog.component.scss']
})
export class WaitDialogComponent {

  private ps: WaitDialogProgress;

  constructor(@Inject(MAT_DIALOG_DATA) progress: WaitDialogProgress) {
    this.progress = progress;
  }

  set progress(progress: WaitDialogProgress) {
    this.ps = progress;
  }

  get progress(): WaitDialogProgress {
    return this.ps;
  }
}
