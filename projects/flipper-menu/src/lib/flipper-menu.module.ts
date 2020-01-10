import { NgModule } from '@angular/core';
import { FlipperMenuComponent } from './flipper-menu.component';
import { CommonModule } from '@angular/common';
import { FlipperComponentsModule } from '@enexus/flipper-components';



@NgModule({
  declarations: [FlipperMenuComponent],
  imports: [
    CommonModule,
    FlipperComponentsModule
  ],
  exports: [FlipperMenuComponent]
})
export class FlipperMenuModule { }
