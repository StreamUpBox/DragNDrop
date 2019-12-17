import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
// TODO: please do not delete down code it is a sample of sql in angular.
// import * as alasql from 'alasql';
// const sql = alasql;
@Component({
  selector: 'flipper-basic-pos',
  templateUrl: './flipper-basic-pos.component.html',
  styleUrls: ['./flipper-basic-pos.component.scss'],
})
export class FlipperBasicPosComponent implements AfterViewInit {

  searchProductUpdate = new Subject<string>();
  @Output() searchEmitValue = new EventEmitter<string>();


  public searchProduct: string;

  canGottenProduct: any[];
get gottenProduct(): any[] {
    return this.canGottenProduct;
}

@Input('gottenProduct')
set gottenProduct(value: any[]) {
    this.canGottenProduct = value;
    this.updatedValue();
}

  @ViewChild('mySearchInput', {static: false}) public searchInputElement: ElementRef;


    updatedValue() {
      if (this.gottenProduct && this.gottenProduct.length > 0) {
         console.log(this.gottenProduct);
      }

    }

    listenEvent(event: Event) {
      event.stopPropagation();
    }
    ngAfterViewInit(): void {
      window.setTimeout(() => {
        this.searchInputElement.nativeElement.focus();
    });
      fromEvent(this.searchInputElement.nativeElement, 'input').pipe(
      map((event: any) => {
        event.preventDefault();

        return event.target.value;
      }),
      filter(res => res.length > 1),

      debounceTime(1000),
      distinctUntilChanged())
      .subscribe((value: string) => {
        console.log('val:', value);
        window.setTimeout(() => {
            this.clearSearchBox();
            if (value) {
              this.searchEmitValue.emit(value);
            }
      });

      }
      );

    }
    clearSearchBox() {
      this.searchInputElement.nativeElement.value = '';
      this.searchInputElement.nativeElement.focus();
    }
}
