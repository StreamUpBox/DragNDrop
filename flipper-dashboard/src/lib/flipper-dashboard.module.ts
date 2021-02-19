import { NgModule } from '@angular/core'
import { FlipperDashboardComponent } from './flipper-dashboard.component'
import { CommonModule } from '@angular/common'
import { FlipperComponentsModule } from '@enexus/flipper-components'
import { DashboardComponent } from './dashboard.component'
import { HttpClientModule } from '@angular/common/http'
// import { NgxChartsModule } from '@swimlane/ngx-charts'; TODO: remove it from dependency it is complicated to use atlease for now.
import { APIService } from '@enexus/api-services'
import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [DashboardComponent, FlipperDashboardComponent],
  imports: [HttpClientModule, CommonModule, FlipperComponentsModule,ChartsModule],
  providers:[APIService],
  exports: [FlipperDashboardComponent],
})
export class FlipperDashboardModule {}
