import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'flipper-variants-dialog-model',
  templateUrl: './variants-dialog-model.component.html',
  styleUrls: ['./variants-dialog-model.component.css']
})
export class VariantsDialogModelComponent implements OnInit {

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Esc') {
      this.done();
    }

    if (event.key === 'Enter') {
        this.done();
    }
  }
  stockControls:any=null;
  constructor(public dialogRef: MatDialogRef<VariantsDialogModelComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
}


  ngOnInit() {

  }

  stockControl(event){
    this.stockControls=event;
  }

  done(){
    this.dialogRef.close(this.stockControls);
  }

  close(){
    this.done();
  }
  
}
