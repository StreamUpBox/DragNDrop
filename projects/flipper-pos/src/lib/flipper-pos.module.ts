import { FlipperComponentsModule } from '@enexus/flipper-components';
import { NgModule } from '@angular/core';
import { FlipperBasicPosComponent } from './basic/flipper-basic-pos.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorsModule } from '@enexus/flipper-vendors';
import { SearchBoxComponent } from './common/search-box/search-box.component';
import { AutocompleteComponent } from './common/autocomplete/autocomplete.component';

@NgModule({
  declarations: [FlipperBasicPosComponent, SearchBoxComponent, AutocompleteComponent],
  imports: [
    BrowserModule,
     FormsModule,
    FlipperComponentsModule,
    ReactiveFormsModule,
    VendorsModule
  ],
  exports: [FlipperBasicPosComponent]
})
export class FlipperPosModule { }
