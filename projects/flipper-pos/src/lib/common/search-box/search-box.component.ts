import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'flipper-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent implements OnInit, AfterViewInit {
  @Output() searchEmitValue = new EventEmitter < string > ();
  public searchControl: FormControl;
  private debounce: number = 600;
  public startSearching:boolean=false;
  public loading:boolean=false;
  
  constructor(private cd: ChangeDetectorRef) { }

  @ViewChild('mySearchInput', {
    static: false
  }) public searchInputElement: ElementRef;


  
  ngOnInit() {
    this.searchControl = new FormControl('');

    this.searchControl.valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe(query => {
        if (query == '' || query == null) {
          this.startSearching=false;
          return;
        }
        this.startSearching=true;

        this.searchEmitValue.emit(query);
      });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.searchInputElement.nativeElement.focus();
  });
    this.cd.detectChanges();
  }

  clearSearchBox() {
    this.searchControl.setValue('');
    this.searchInputElement.nativeElement.focus();
  }

}
