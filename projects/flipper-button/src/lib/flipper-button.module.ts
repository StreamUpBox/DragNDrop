import { NgModule } from '@angular/core';
import { FlipperButtonComponent } from './flipper-button.component';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FlipperInputsComponent } from './flipper-inputs/flipper-inputs.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],

  declarations: [FlipperButtonComponent, FlipperInputsComponent],
  entryComponents: [],
  exports: [FlipperButtonComponent, FlipperInputsComponent]
})
export class FlipperButtonModule { }
