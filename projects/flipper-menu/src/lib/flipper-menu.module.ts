import { NgModule } from '@angular/core';
import { FlipperMenuComponent } from './flipper-menu.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FlipperMenuComponent],
  imports: [
    CommonModule
  ],
  exports: [FlipperMenuComponent]
})
export class FlipperMenuModule { }
