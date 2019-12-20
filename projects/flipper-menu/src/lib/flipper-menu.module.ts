import { NgModule } from '@angular/core';
import { FlipperMenuComponent } from './flipper-menu.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlipperComponentsModule } from '@enexus/flipper-components';



@NgModule({
  declarations: [FlipperMenuComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlipperComponentsModule
  ],
  exports: [FlipperMenuComponent]
})
export class FlipperMenuModule { }
