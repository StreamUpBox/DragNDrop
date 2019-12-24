import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxComponent } from './search-box.component';
import { DebugElement, ElementRef } from '@angular/core';
import { By, BrowserModule } from '@angular/platform-browser';
import { FlipperBasicPosComponent } from '../../basic/flipper-basic-pos.component';
import { BasicShoppingListComponent } from '../basic-shopping-list/basic-shopping-list.component';
import { StandardShoppingListComponent } from '../standard-shopping-list/standard-shopping-list.component';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { CalculatorComponent } from '../calculator/calculator.component';
import { ShoppingListsComponent } from '../shopping-lists/shopping-lists.component';
import { FlipperComponentsModule } from '@enexus/flipper-components';
import { VendorsModule } from '@enexus/flipper-vendors';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let de: DebugElement;
  let button: ElementRef;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlipperBasicPosComponent, SearchBoxComponent,
        AutocompleteComponent, ShoppingListsComponent, BasicShoppingListComponent,
        StandardShoppingListComponent, CalculatorComponent],
      imports: [
        BrowserModule,
        FlipperComponentsModule,
        VendorsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    button = de.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initialize ngOnInit', () => {
    component.ngOnInit();
  });



  it('should search product from input', () => {

      const fixtures = TestBed.createComponent(SearchBoxComponent);
      const app = fixtures.debugElement.componentInstance;
      const el = fixtures.nativeElement.querySelector('input');
      el.value = 'ganza';
      dispatchEvent(new Event(el));
      fixtures.detectChanges();
      fixtures.whenStable().then(() => {expect(app.data).toBe('newvalue');
    });

  });

  it('should emit the output value that will use to search a product', () => {
    component.ngOnInit();
    component.searchEmitValue.subscribe(g => {
       expect(g).toEqual('ganza');
      // done();
    });
  });

  it('should emit add to cart variant', () => {
      spyOn(component.addToCartEmit, 'emit');
      component.addToCart({id: 1,
      sku: 'P',
      name: 'Cake',
      isActive: true
    });
      expect(component.addToCartEmit.emit).toHaveBeenCalledWith({id: 1,
      sku: 'P',
      name: 'Cake',
      isActive: true
    });

    });

  it('should receive and set input foundVariant', () => {
    component.foundVariant = [{id: 1,
      sku: 'P',
      name: 'Cake',
      isActive: true
    }];
    expect(component.foundVariant).toEqual([{id: 1,
      sku: 'P',
      name: 'Cake',
      isActive: true
    }]);
  });

  it('should getNumber', () => {
    component.clearSearchBox();
   });

});
