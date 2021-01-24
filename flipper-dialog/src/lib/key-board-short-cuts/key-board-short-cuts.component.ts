import { Component, Inject, HostListener } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'lib-key-board-short-cuts',
  templateUrl: './key-board-short-cuts.component.html',
  styleUrls: ['./key-board-short-cuts.component.scss'],
})
export class KeyBoardShortCutsComponent {
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Esc' || event.key === 'Enter') {
      this.dialogRef.close(true)
    }
  }
  constructor(public dialogRef: MatDialogRef<KeyBoardShortCutsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}
