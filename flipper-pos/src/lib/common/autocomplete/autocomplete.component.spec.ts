import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AutocompleteComponent } from './autocomplete.component'
import { FlipperComponentsModule } from '@enexus/flipper-components'
import { VendorsModule } from '@enexus/flipper-vendors'
import { BrowserModule } from '@angular/platform-browser'
import { StandardShoppingListComponent } from '../standard-shopping-list/standard-shopping-list.component'
import { CalculatorComponent } from '../calculator/calculator.component'
import { ShoppingListsComponent } from '../shopping-lists/shopping-lists.component'
import { FlipperBasicPosComponent } from '../../basic/flipper-basic-pos.component'
import { SearchBoxComponent } from '../search-box/search-box.component'
import { BasicShoppingListComponent } from '../basic-shopping-list/basic-shopping-list.component'
describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent
  let fixture: ComponentFixture<AutocompleteComponent>

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
    fixture = TestBed.createComponent(AutocompleteComponent)
    component = fixture.componentInstance
    component.loading = false
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set loading to true', () => {
    component.loading = true
    expect(component.loading).toEqual(true)
  })
  it('should set loading to false', () => {
    expect(component.loading).toEqual(false)
  })
})
