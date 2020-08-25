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
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';


@Component({
  selector: 'flipper-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent implements OnInit, AfterViewInit {
  constructor(private cd: ChangeDetectorRef) {}

  @Input('foundVariant')
  set foundVariant(value: Variant[]) {
    this.canfoundVariant = value;
    this.loading = false;
    this.addToCartOnGotSingleItem(value);
  }
  get foundVariant(): Variant[] {
    return this.canfoundVariant;
  }

  @Input('didUserCloseModel')
  set didUserCloseModel(bol: boolean) {
    this.userClosedModel = bol;

    if (bol === true) {
          this.clearSearchBox();
        }

  }
  get didUserCloseModel(): boolean {
    return this.userClosedModel;
  }
  private userClosedModel = false;

  @Output() searchEmitValue = new EventEmitter < string > ();
  @Output() addToCartEmit = new EventEmitter < Variant > ();

  public searchControl: FormControl;
  private debounce = 1000;
  public loading = false;
  public event: KeyboardEvent;
  isSearching = false;

  @ViewChild('mySearchInput', {
    static: false
  }) public searchInputElement: ElementRef;
  private canfoundVariant: Variant[] = [];

  @ViewChild('autoCompleteInput', { read: MatAutocompleteTrigger, static: false })
  autoComplete: MatAutocompleteTrigger;

  @Input() currency = 'RWF';
  timer = null;

  @HostListener('document:keydown', ['$event'])
      onKeydownHandler(event: KeyboardEvent) {
        this.event = event;
        if ((this.event.shiftKey && this.event.key === 'F') ||
           (this.event.shiftKey && this.event.key === 'S')) {
          setTimeout(() => {
            this.clearSearchBox();
              },
            2);
        }
        if (this.event.key === 'Shift') {
                setTimeout(() => {
                this.searchInputElement.nativeElement.blur();
                this. close();
                },
              2);
        }
    }

  close() {
    this.autoComplete.closePanel();
  }
  startSearching(event){
    if (event.target.value === '' || event.target.value === null) {
      this.foundVariant = [];
      this. clearSearchBox();
      return;
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.foundVariant = [];
      this.searching(event.target.value);
    }, 1000);

  }


  searching(query){
            this.loading = true;
            this.isSearching = true;
            this.searchEmitValue.emit(query);
  }

  ngOnInit() {
    // this.searchControl = new FormControl('');

    // this.searchControl.valueChanges
    //   .pipe(debounceTime(this.debounce),
    //         distinctUntilChanged()
    //         )
    //       .subscribe(query => {
    //         if (query === '' || query === null) {
    //           this.isSearching = false;
    //           return;
    //         }
    //         this.loading = true;
    //         this.isSearching = true;
    //         this.searchEmitValue.emit(query);
    //   });
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
    this.clearSearchBox();
  }
  focusing() {
    this.clearSearchBox();
  }


  clearSearchBox() {
        if (this.searchInputElement !== undefined) {
          this.searchInputElement.nativeElement.value = '';
          this.searchInputElement.nativeElement.focus();
          this.isSearching = false;
          this.close();
        }
  }

}
