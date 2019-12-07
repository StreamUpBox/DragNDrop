import { NgModule } from '@angular/core';
import { FlipperButtonComponent } from './flipper-button.component';
import { CommonModule } from '@angular/common';
import { BasicCircleButton, BasicRectangleButton } from './button.component';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicButtonDirective } from './dynamic-button.directive';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [FlipperButtonComponent, BasicCircleButton, BasicRectangleButton, DynamicButtonDirective],
  entryComponents: [BasicCircleButton, BasicRectangleButton],
  exports: [FlipperButtonComponent]
})
export class FlipperButtonModule { }
