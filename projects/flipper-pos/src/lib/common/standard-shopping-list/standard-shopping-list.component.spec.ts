import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardShoppingListComponent } from './standard-shopping-list.component';
import { FlipperComponentsModule } from '@enexus/flipper-components';
import { VendorsModule } from '@enexus/flipper-vendors';
import { FlipperBasicPosComponent } from '../../basic/flipper-basic-pos.component';
import { ShoppingListsComponent } from '../shopping-lists/shopping-lists.component';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { BasicShoppingListComponent } from '../basic-shopping-list/basic-shopping-list.component';
import { CalculatorComponent } from '../calculator/calculator.component';

describe('StandardShoppingListComponent', () => {
  let component: StandardShoppingListComponent;
  let fixture: ComponentFixture<StandardShoppingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlipperComponentsModule,
        VendorsModule],
      declarations: [FlipperBasicPosComponent, ShoppingListsComponent, SearchBoxComponent, AutocompleteComponent
         , ShoppingListsComponent, BasicShoppingListComponent, StandardShoppingListComponent, CalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
