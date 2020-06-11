import { NgModule } from '@angular/core';
import { FlipperDashboardComponent } from './flipper-dashboard.component';
import { CommonModule } from '@angular/common';
import { FlipperComponentsModule } from '@enexus/flipper-components';


@NgModule({
  declarations: [FlipperDashboardComponent],
  imports: [
    CommonModule,
    FlipperComponentsModule
  ],
  exports: [FlipperDashboardComponent]
})
export class FlipperDashboardModule { }
