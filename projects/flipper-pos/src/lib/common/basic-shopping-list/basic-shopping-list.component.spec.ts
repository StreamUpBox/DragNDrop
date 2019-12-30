import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicShoppingListComponent } from './basic-shopping-list.component';
import {Shoppings, FlipperComponentsModule, Order } from '@enexus/flipper-components';
import { FlipperBasicPosComponent } from '../../basic/flipper-basic-pos.component';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { ShoppingListsComponent } from '../shopping-lists/shopping-lists.component';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { StandardShoppingListComponent } from '../standard-shopping-list/standard-shopping-list.component';
import { CalculatorComponent } from '../calculator/calculator.component';
import { BrowserModule } from '@angular/platform-browser';
import { VendorsModule } from '@enexus/flipper-vendors';

describe('BasicShoppingListComponent', () => {
  let component: BasicShoppingListComponent;
  let fixture: ComponentFixture<BasicShoppingListComponent>;
  let orderItems: Shoppings[] = [];
  let item: Shoppings;

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
    fixture = TestBed.createComponent(BasicShoppingListComponent);
    component = fixture.componentInstance;
    item = {
      id: 1,
      price: 100,
      variantName: 'cake',
      quantity: 1,
      variantId: 1,
      orderId: 1,
      subTotal: 100
    };

    orderItems = component.orderItems = [item];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get item', () => {
    component.orderItems = orderItems;
    expect(component.orderItems).toEqual([{
      id: 1,
      price: 100,
      variantName: 'cake',
      quantity: 1,
      variantId: 1,
      orderId: 1,
      subTotal: 100
    }]);
  });

  it('action should be minus truthy', () => {
    const action = '-';
    component.action = action;
    component.updateQuantity(item, action);

    expect(component.action).toBeTruthy();
  });



  it('action should be plus truthy', () => {
    const action = '+';
    component.action = action;
    component.updateQuantity(item, action);
    expect(component.action).toBeTruthy();
  });

});
