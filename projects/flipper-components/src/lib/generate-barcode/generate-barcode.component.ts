import { Component, Input } from '@angular/core';
import { Labels } from '../entries';

@Component({
  selector: 'flipper-generate-barcode',
  templateUrl: './generate-barcode.component.html',
  styleUrls: ['./generate-barcode.component.css']
})
export class GenerateBarcodeComponent {


  @Input() labels: Labels[] = [];
  @Input() showName = true;
  @Input() showSku = true;


}
