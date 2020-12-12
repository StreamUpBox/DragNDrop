import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { TestingComponentComponent } from './testing-component/testing-component.component'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { VendorsModule } from '@enexus/flipper-vendors'
// import { FlipperMenuModule } from 'flipper-menu';
import { FlipperComponentsModule, PouchDBService } from '@enexus/flipper-components'

import { MigrationModule } from './migration/migration.module'
import { FlipperInventoryModule } from '@enexus/flipper-inventory'
import { FlipperOfflineDatabaseModule } from '@enexus/flipper-offline-database'

import { FlipperPosModule } from '@enexus/flipper-pos'
// import { FlipperSettingsModule } from '@enexus/flipper-settings';

// import { MigrationModule } from './migration/migration.module';

@NgModule({
  declarations: [AppComponent, TestingComponentComponent],
  imports: [
    BrowserModule,
    // DialogModule,
    VendorsModule,
    // ColorModule,
    // FontModule,
    // FlipperButtonModule,
    // FlipperSettingsModule,
    // FlipperMenuModule,
    // FlipperPaymentCardModule,
    // FlipperDashboardModule,
    // FlipperEventModule,
    FlipperComponentsModule,
    FlipperPosModule,
    BrowserAnimationsModule,
    FlipperOfflineDatabaseModule,
    FlipperInventoryModule,
    // FlipperFileUploadModule,
    MigrationModule.forRoot(),
    AppRoutingModule,
  ],
  entryComponents: [],
  providers: [PouchDBService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    //  overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }
}
declare module '@angular/core' {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>
    providers?: Provider[]
  }
}
