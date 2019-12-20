import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
// TODO: please do not delete down code it is a sample of sql in angular.
// import * as alasql from 'alasql';
// const sql = alasql;
@Component({
  selector: 'flipper-basic-pos',
  templateUrl: './flipper-basic-pos.component.html',
  styleUrls: ['./flipper-basic-pos.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlipperBasicPosComponent {

      @Output() searchEmitValue = new EventEmitter < string > ();

      private canGottenProduct: any[] = [];

      @Input('gottenProduct') set gottenProduct(value: any[]) {
        this.canGottenProduct = value;
      }
      get gottenProduct(): any[] {
        return this.canGottenProduct;
      }


      public searchPosProduct(event) {
        if (event) {
          this.searchEmitValue.emit(event);
        }
      }
}
