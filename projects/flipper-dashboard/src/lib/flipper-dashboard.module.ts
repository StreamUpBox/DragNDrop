import { NgModule } from '@angular/core';
import { FlipperDashboardComponent } from './flipper-dashboard.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlipperComponentsModule } from '@enexus/flipper-components';



@NgModule({
  declarations: [FlipperDashboardComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlipperComponentsModule
  ],
  exports: [FlipperDashboardComponent]
})
export class FlipperDashboardModule { }
