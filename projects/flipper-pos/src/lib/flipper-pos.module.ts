import { FlipperComponentsModule } from '@enexus/flipper-components';
import { NgModule } from '@angular/core';
import { FlipperBasicPosComponent } from './basic/flipper-basic-pos.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FlipperBasicPosComponent],
  imports: [
    BrowserModule, FormsModule,
    FlipperComponentsModule
  ],
  exports: [FlipperBasicPosComponent]
})
export class FlipperPosModule { }
