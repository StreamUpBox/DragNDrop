import { NgModule } from '@angular/core';
import { FlipperButtonComponent } from './flipper-button.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FlipperButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [FlipperButtonComponent]
})
export class FlipperButtonModule { }
