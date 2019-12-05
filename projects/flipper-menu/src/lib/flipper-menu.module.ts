import { NgModule } from '@angular/core';
import { FlipperMenuComponent } from './flipper-menu.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [FlipperMenuComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [FlipperMenuComponent]
})
export class FlipperMenuModule { }
