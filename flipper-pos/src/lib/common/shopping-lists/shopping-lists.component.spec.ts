import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ShoppingListsComponent } from './shopping-lists.component'
import { FlipperBasicPosComponent } from '../../basic/flipper-basic-pos.component'
import { SearchBoxComponent } from '../search-box/search-box.component'
import { BasicShoppingListComponent } from '../basic-shopping-list/basic-shopping-list.component'
import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
import { StandardShoppingListComponent } from '../standard-shopping-list/standard-shopping-list.component'
import { CalculatorComponent } from '../calculator/calculator.component'
import { FlipperComponentsModule } from '@enexus/flipper-components'
import { BrowserModule } from '@angular/platform-browser'
import { VendorsModule } from '@enexus/flipper-vendors'

describe('ShoppingListsComponent', () => {
  let component: ShoppingListsComponent
  let fixture: ComponentFixture<ShoppingListsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FlipperBasicPosComponent,
        SearchBoxComponent,
        AutocompleteComponent,
        ShoppingListsComponent,
        BasicShoppingListComponent,
        StandardShoppingListComponent,
        CalculatorComponent,
      ],
      imports: [BrowserModule, FlipperComponentsModule, VendorsModule],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
