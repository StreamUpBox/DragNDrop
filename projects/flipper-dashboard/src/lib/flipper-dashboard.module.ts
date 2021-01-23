import { NgModule } from '@angular/core'
import { FlipperDashboardComponent } from './flipper-dashboard.component'
import { FlipperComponentsModule } from '@enexus/flipper-components'
import { DashboardComponent } from './dashboard.component'
@NgModule({
  declarations: [DashboardComponent, FlipperDashboardComponent],
  imports: [FlipperComponentsModule],
  exports: [FlipperDashboardComponent, DashboardComponent],
})
export class FlipperDashboardModule {}
