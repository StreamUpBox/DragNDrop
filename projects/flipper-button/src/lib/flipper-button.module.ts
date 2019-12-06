import { NgModule } from '@angular/core';
import { FlipperButtonComponent, DynamicComponentDirective } from './flipper-button.component';
import { CommonModule } from '@angular/common';
import { BasicCircleButton, BasicRectangleButton } from './button.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [FlipperButtonComponent, BasicCircleButton, BasicRectangleButton, DynamicComponentDirective],
  entryComponents: [BasicCircleButton, BasicRectangleButton],
  exports: [FlipperButtonComponent]
})
export class FlipperButtonModule { }
