import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'flipper-disacrd-dialog-model',
  templateUrl: './disacrd-dialog-model.component.html',
  styleUrls: ['./disacrd-dialog-model.component.css']
})
export class DisacrdDialogModelComponent implements OnInit {

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
      if (event.key === 'Esc') {
          this.dialogRef.close();
      }
      if (event.key === 'Delete') {
          this.dialogRef.close('discard');
      }
      if (event.key === 'Enter') {
          this.dialogRef.close('save');
      }
    }

  constructor(public dialogRef: MatDialogRef<DisacrdDialogModelComponent>) {}

  ngOnInit() {
  }

}
