import { Component, OnInit, Inject, HostListener } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'flipper-disacrd-dialog-model',
  templateUrl: './disacrd-dialog-model.component.html',
  styleUrls: ['./disacrd-dialog-model.component.css'],
})
export class DisacrdDialogModelComponent {
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Esc') {
      this.dialogRef.close()
    }
    if (event.key === 'Delete') {
      this.dialogRef.close('discard')
    }
    if (event.key === 'Enter') {
      this.dialogRef.close('save')
    }
  }

  constructor(public dialogRef: MatDialogRef<DisacrdDialogModelComponent>) {}
}
