import { FlipperEventModule } from './../../projects/flipper-event/src/lib/event.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TestingComponentComponent } from './testing-component/testing-component.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlipperDashboardModule } from 'flipper-dashboard';

import { VendorsModule } from '@enexus/flipper-vendors';
import { FlipperMenuModule } from 'flipper-menu';
import { FlipperPosModule } from '@enexus/flipper-pos';
import { FlipperComponentsModule, PouchDBService } from '@enexus/flipper-components';
import { FlipperOfflineDatabaseModule } from '@enexus/flipper-offline-database';
import { FlipperSettingsModule } from '@enexus/flipper-settings';
import { FlipperInventoryModule } from '@enexus/flipper-inventory';
import { FlipperFileUploadModule } from '@enexus/flipper-file-upload';
import { FlipperPaymentCardModule } from '@enexus/payment-card';
// import { MigrationModule } from './migration/migration.module';


@NgModule({
  declarations: [
    AppComponent,
    TestingComponentComponent
  ],
  imports: [
    BrowserModule,
    // DialogModule,
    VendorsModule,
    // ColorModule,
    // FontModule,
    // FlipperButtonModule,
    // FlipperSettingsModule,
    FlipperMenuModule,
    FlipperPaymentCardModule,
    // FlipperDashboardModule,
    // FlipperEventModule,
    FlipperComponentsModule,
    // FlipperPosModule,
    BrowserAnimationsModule,
    // FlipperOfflineDatabaseModule,
    // FlipperInventoryModule,
    // FlipperFileUploadModule,
    // MigrationModule.forRoot(),
    AppRoutingModule
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    //  overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }
}

