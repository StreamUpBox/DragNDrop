import { Component, Input } from '@angular/core';
import { Labels } from '../entries';

@Component({
  selector: 'flipper-generate-barcode',
  templateUrl: './generate-barcode.component.html',
  styleUrls: ['./generate-barcode.component.css']
})
export class GenerateBarcodeComponent {

  @Input() labels:Labels[]=[];
  @Input() showName:boolean=true;
  @Input() showSku:boolean=true;

  constructor() {

  }
}
