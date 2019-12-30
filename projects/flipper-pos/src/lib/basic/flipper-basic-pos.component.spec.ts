import { FlipperComponentsModule } from './../../../../flipper-components/src/lib/components.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlipperBasicPosComponent } from './flipper-basic-pos.component';
import { SearchBoxComponent } from '../common/search-box/search-box.component';
import { VendorsModule } from '@enexus/flipper-vendors';
import { AutocompleteComponent } from '../common/autocomplete/autocomplete.component';
import { ShoppingListsComponent } from '../common/shopping-lists/shopping-lists.component';
import { BasicShoppingListComponent } from '../common/basic-shopping-list/basic-shopping-list.component';
import { StandardShoppingListComponent } from '../common/standard-shopping-list/standard-shopping-list.component';
import { CalculatorComponent } from '../common/calculator/calculator.component';
import { BrowserModule } from '@angular/platform-browser';
import { Order, Variant } from '@enexus/flipper-components';

describe('FlipperBasicPosComponent', () => {
  let component: FlipperBasicPosComponent;
  let fixture: ComponentFixture<FlipperBasicPosComponent>;
  const order: Order = {id: 1, branchId: 1, orderNumber: '01',
  subTotal: 0.00,
  cashReceived: 0.00,
  customerChangeDue: 0.00,
orderItems: [{id: 1,
  price: 100,
  variantName: 'cake',
  quantity: 1,
  variantId: 1,
  orderId: 1,
  subTotal: 100
}]};

  const variant: Variant[] = [{id: 1,
  sku: 'P',
  name: 'Cake',
  isActive: true,
  priceVariant: {
    id: 1,
    priceId: 1,
    variantId: 1,
    minUnit: 0,
    maxUnit: 0,
    retailPrice: 500,
    supplyPrice: 150,
    wholeSalePrice: 500,
    discount: 2,
    markup: 1
  }
}];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FlipperBasicPosComponent,
         SearchBoxComponent,
        AutocompleteComponent,
        ShoppingListsComponent,
         BasicShoppingListComponent,
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
    fixture = TestBed.createComponent(FlipperBasicPosComponent);
    component = fixture.componentInstance;
    component.currentOrder = order;
    component.foundVariant = variant;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive and set input foundVariant', () => {

    expect(component.foundVariant).toEqual([{id: 1,
      sku: 'P',
      name: 'Cake',
      isActive: true,
      priceVariant: {
        id: 1,
        priceId: 1,
        variantId: 1,
        minUnit: 0,
        maxUnit: 0,
        retailPrice: 500,
        supplyPrice: 150,
        wholeSalePrice: 500,
        discount: 2,
        markup: 1
      }
    }]);

  });

  it('should get current order', () => {

    expect(component.currentOrder).toEqual({id: 1, branchId: 1, orderNumber: '01',
    subTotal: 0.00,
    cashReceived: 0.00,
    customerChangeDue: 0.00,
    orderItems: [{id: 1,
      price: 100,
      variantName: 'cake',
      quantity: 1,
      variantId: 1,
      orderId: 1,
      subTotal: 100
    }]});
  });

  // it('should emit the output value that will use to search a product', () => {
  //  const  event = 'ganza';

  //  component.searchEmitValue.subscribe(g => {
  //     expect(g).toEqual('ganza');
  //  });
  //  component.searchPosProduct(event);
  // });


});
