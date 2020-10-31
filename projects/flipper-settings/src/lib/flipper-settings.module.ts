import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from '@enexus/flipper-vendors';
import { FlipperEventModule } from '@enexus/flipper-event';
import { FlipperComponentsModule } from '@enexus/flipper-components';
import { CreateUpdateBusinessComponent } from './business/create-update-business/create-update-business.component';
import { BusinessComponent } from './business/view/business.component';
import { FlipperSettingsComponent } from './flipper-settings.component';



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
    FlipperComponentsModule
  ],
  exports: [
    CreateUpdateBusinessComponent,
    BusinessComponent,
    FlipperSettingsComponent
  ]
})
export class FlipperSettingsModule { }
