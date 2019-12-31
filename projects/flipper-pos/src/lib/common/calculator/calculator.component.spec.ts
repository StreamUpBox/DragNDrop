import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { Order, FlipperComponentsModule } from '@enexus/flipper-components';
import { FlipperBasicPosComponent } from '@enexus/flipper-pos';
import { BrowserModule } from '@angular/platform-browser';
import { VendorsModule } from '@enexus/flipper-vendors';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { ShoppingListsComponent } from '../shopping-lists/shopping-lists.component';
import { BasicShoppingListComponent } from '../basic-shopping-list/basic-shopping-list.component';
import { StandardShoppingListComponent } from '../standard-shopping-list/standard-shopping-list.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let order: Order;

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
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    component.currentOrder = {id: 1,
      reference: 'SO',
      orderNumber: 'SO',
      branchId: 1,
      status: 'open',
      orderType: 'sales',
      isActive: true,
      orderItems: [{id: 1,
        price: 100,
        variantName: 'cake',
        quantity: 1,
        variantId: 1,
        orderId: 1,
        subTotal: 100
      }],
      subTotal: 0.00,
      cashReceived: 0.00,
      customerChangeDue: 0.00
    };
    order = component.currentOrder;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear', () => {
    component.clear();
   });

  it('currentOrder should be falsy', () => {
    component.currentOrder = null;
    component.clear();
    component.makeTotal();
    expect(component.currentOrder).toBeFalsy();
});
  it('currentOrder should be truthy', () => {
  component.currentOrder = order;
  component.clear();
  component.makeTotal();
  expect(component.currentOrder).toBeTruthy();
});


/// decimal
  it('should getDecimal', () => {
  component.getDecimal();
 });

  it('currentNumber should be truthy', () => {
  component.currentNumber = '100.00';
  component.getDecimal();
  expect(component.currentNumber).toBeTruthy();
});


  it('should getNumber', () => {
  component.getNumber('6');
  expect(component.currentNumber).toEqual('6');
 });


});
