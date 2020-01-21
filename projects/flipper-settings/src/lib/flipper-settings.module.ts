import { NgModule } from '@angular/core';
import { FlipperSettingsComponent } from './flipper-settings.component';
import { CommonModule } from '@angular/common';
import { VendorsModule } from '@enexus/flipper-vendors';
import { FlipperEventModule } from '@enexus/flipper-event';
import { FlipperComponentsModule } from '@enexus/flipper-components';
import { CreateUpdateBusinessComponent } from './business/create-update-business/create-update-business.component';
import { BusinessComponent } from './business/view/business.component';
import { FlipperSettingsRoutingModule } from './flipper-setting-routing.module';



@NgModule({
  declarations: [
     FlipperSettingsComponent,
     CreateUpdateBusinessComponent,
      BusinessComponent
    ],
  imports: [
    CommonModule,
    VendorsModule,
    FlipperEventModule,
    FlipperComponentsModule,
    // FlipperSettingsRoutingModule
  ],
  exports: [
    CreateUpdateBusinessComponent,
    BusinessComponent,
    FlipperSettingsComponent,
    // FlipperSettingsRoutingModule
  ]
})
export class FlipperSettingsModule { }
