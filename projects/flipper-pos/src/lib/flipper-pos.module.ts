import { FlipperComponentsModule } from '@enexus/flipper-components';
import { NgModule } from '@angular/core';
import { FlipperBasicPosComponent } from './basic/flipper-basic-pos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VendorsModule } from '@enexus/flipper-vendors';
import { SearchBoxComponent } from './common/search-box/search-box.component';
import { AutocompleteComponent } from './common/autocomplete/autocomplete.component';
import { ShoppingListsComponent } from './common/shopping-lists/shopping-lists.component';
import { BasicShoppingListComponent } from './common/basic-shopping-list/basic-shopping-list.component';
import { StandardShoppingListComponent } from './common/standard-shopping-list/standard-shopping-list.component';
import { CalculatorComponent } from './common/calculator/calculator.component';
import { DialogModule } from '@enexus/flipper-dialog';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FlipperBasicPosComponent, SearchBoxComponent,
    AutocompleteComponent, ShoppingListsComponent, BasicShoppingListComponent,
    StandardShoppingListComponent, CalculatorComponent],
  imports: [
   CommonModule,
    FlipperComponentsModule,
    VendorsModule,
    DialogModule

  ],
  exports: [FlipperBasicPosComponent, SearchBoxComponent,
    AutocompleteComponent, ShoppingListsComponent, BasicShoppingListComponent,
    StandardShoppingListComponent, CalculatorComponent]
})
export class FlipperPosModule { }
