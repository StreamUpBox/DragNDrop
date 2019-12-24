import { FlipperComponentsModule } from './../../../../flipper-components/src/lib/components.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlipperBasicPosComponent } from './flipper-basic-pos.component';
import { SearchBoxComponent } from '../common/search-box/search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorsModule } from '@enexus/flipper-vendors';
import { AutocompleteComponent } from '../common/autocomplete/autocomplete.component';
import { ShoppingListsComponent } from '../common/shopping-lists/shopping-lists.component';
import { BasicShoppingListComponent } from '../common/basic-shopping-list/basic-shopping-list.component';
import { StandardShoppingListComponent } from '../common/standard-shopping-list/standard-shopping-list.component';
import { CalculatorComponent } from '../common/calculator/calculator.component';
import { CalculateTotalClassPipe } from '@enexus/flipper-components';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlipperPosModule } from '../flipper-pos.module';
import { BrowserModule } from '@angular/platform-browser';

describe('FlipperBasicPosComponent', () => {
  let component: FlipperBasicPosComponent;
  let fixture: ComponentFixture<FlipperBasicPosComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive and set input gottenVariant', () => {
    component.gottenVariant =[{id:1,
      sku:'P',
      name:'Cake',
      isActive:true,
      priceVariant:{
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
    expect(component.gottenVariant).toEqual([{id:1,
      sku:'P',
      name:'Cake',
      isActive:true,
      priceVariant:{
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
    component.currentOrder = {id:1,branchId:1,orderNumber:'01',
  orderItems:[{id:1,
    price:100,
    variantName:'cake',
    quantity:1,
    variantId:1,
    orderId:1,
    subTotal:100
  }]};
    expect(component.currentOrder).toEqual({id:1,branchId:1,orderNumber:'01',
    orderItems:[{id:1,
      price:100,
      variantName:'cake',
      quantity:1,
      variantId:1,
      orderId:1,
      subTotal:100
    }]});
  });

  it('should emit the output value that will use to search a product', () => {
   const  event = 'ganza';

   component.searchEmitValue.subscribe(g => {
      expect(g).toEqual('ganza');
     // done();
   });
   component.searchPosProduct(event);
  });


  it('should emit add to cart variant', () => {
    spyOn(component.addToCartEmit, 'emit');
  component.addToCart({id:1,
    sku:'P',
    name:'Cake',
    isActive:true
  });
  expect(component.addToCartEmit.emit).toHaveBeenCalledWith({id:1,
    sku:'P',
    name:'Cake',
    isActive:true
  });

  });

 


});
