import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  Input,
  HostListener
} from '@angular/core';
import {
  FormControl
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { Variant } from '@enexus/flipper-components';
import { MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'flipper-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent implements OnInit, AfterViewInit {
  @Output() searchEmitValue = new EventEmitter < string > ();
  @Output() addToCartEmit = new EventEmitter < Variant > ();
  public searchControl: FormControl;
  private debounce = 600;
  public startSearching = false;
  public loading = false;

  constructor(private cd: ChangeDetectorRef) {}

  @ViewChild('mySearchInput', {
    static: false
  }) public searchInputElement: ElementRef= null;
  private canfoundVariant: Variant[] = [];

  @ViewChild('autoCompleteInput', { read: MatAutocompleteTrigger, static: false })
  autoComplete: MatAutocompleteTrigger;

  @HostListener('document:keydown', ['$event']) 
  onKeydownHandler(event: KeyboardEvent) {
  
     // start focusing on search input box by presskey s or f
     if((event.shiftKey && event.keyCode===70) || (event.shiftKey && event.keyCode===83)){
       setTimeout(() => {
        this.clearSearchBox();
       }, 2);
     

    }
    // stop focusing on search input box by presskey of shift
     if(event.keyCode===16){
      setTimeout(() => {
      this.searchInputElement.nativeElement.blur();
      this. close();
    }, 2);
     }
    }

  @Input('foundVariant')

  set foundVariant(value: Variant[]) {
    this.canfoundVariant = value;
    this.loading = false;
    this.addToCartOnGotSingleItem(value);
  }
  get foundVariant(): Variant[] {
    return this.canfoundVariant;
  }

  close() {
    this.autoComplete.closePanel();
  }



  ngOnInit() {
    this.searchControl = new FormControl('');

    this.searchControl.valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe(query => {
        if (query === '' || query === null) {
          this.startSearching = false;
          return;
        }
        this.loading = true;

        this.searchEmitValue.emit(query);
      });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.searchInputElement.nativeElement.focus();
    });
    this.cd.detectChanges();
  }

  addToCartOnGotSingleItem(variants: Variant[]) {
    if (variants.length === 1) {
      this.addToCart(variants[0]);
      this.clearSearchBox();

    }
  }

  addToCart(variant: Variant) {
    this.addToCartEmit.emit(variant);
    this. clearSearchBox();
  }



  clearSearchBox() {
        this.searchInputElement.nativeElement.value = '';
        this.searchInputElement.nativeElement.focus();
        this.close();
  
  }

}
