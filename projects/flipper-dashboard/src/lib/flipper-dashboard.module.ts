import { NgModule } from '@angular/core'
import { FlipperDashboardComponent } from './flipper-dashboard.component'
import { CommonModule } from '@angular/common'
import { FlipperComponentsModule } from '@enexus/flipper-components'
import { DashboardComponent } from './dashboard.component'
import { HttpClientModule } from '@angular/common/http'
@NgModule({
  declarations: [DashboardComponent, FlipperDashboardComponent],
  imports: [HttpClientModule, CommonModule, FlipperComponentsModule],
  exports: [FlipperDashboardComponent, DashboardComponent],
})
export class FlipperDashboardModule {}
