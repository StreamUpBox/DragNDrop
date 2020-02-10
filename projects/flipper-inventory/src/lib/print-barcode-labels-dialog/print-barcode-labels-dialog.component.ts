import { Component, OnInit, Inject, HostListener, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Labels } from '@enexus/flipper-components';



@Component({
  selector: 'flipper-print-barcode-labels-dialog',
  templateUrl: './print-barcode-labels-dialog.component.html',
  styleUrls: ['./print-barcode-labels-dialog.component.css']
})
export class PrintBarcodeLabelsDialogComponent implements OnInit {
showName:boolean=true;
showSku:boolean=true;
@HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
  
  if (event.key === 'Esc') {
      this.close();
  }
 
  if (event.key === 'Enter') {
      this.printOut();
  }
}
@ViewChild('barcodeLabels',{static:true}) myDiv: ElementRef;
document=document;
  constructor(public dialogRef: MatDialogRef<PrintBarcodeLabelsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public labels: Labels[],private ren: Renderer2) {}

  ngOnInit() {
  }
close(){
  this.dialogRef.close();
}
printOut() {
    var contents = this.myDiv.nativeElement.innerHTML;
    var frame1 = this.ren.createElement('iframe');
    frame1.name = "frame3";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow ;
    frameDoc.document.open();
   frameDoc.document.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=70"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Print Brcode Labels</title>');
    frameDoc.document.write('</head><body>');
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout( () =>{
        window.frames["frame3"].focus();
        window.frames["frame3"].print();
        document.body.removeChild(frame1);
    }, 500);
    return false;
  }
}
