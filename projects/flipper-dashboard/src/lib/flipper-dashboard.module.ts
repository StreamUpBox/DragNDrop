import { NgModule } from '@angular/core';
import { FlipperDashboardComponent } from './flipper-dashboard.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [FlipperDashboardComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [FlipperDashboardComponent]
})
export class FlipperDashboardModule { }
