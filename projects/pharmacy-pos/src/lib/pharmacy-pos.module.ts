import { NgModule } from '@angular/core';
import { PharmacyPosComponent } from './pharmacy-pos.component';
// import { PosModule } from './pos/pos.module';
@NgModule({
  declarations: [PharmacyPosComponent],
  imports: [
    // BrowserModule,
    // PosModule
  ],
  exports: [PharmacyPosComponent]
})
export class PharmacyPosModule { }
