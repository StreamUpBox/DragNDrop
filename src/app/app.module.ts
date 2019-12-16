import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TestingComponentComponent } from './testing-component/testing-component.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlipperDashboardModule } from 'flipper-dashboard';
import { DialogComponent } from './dialog/dialog.component';
import { ColorModule } from 'projects/flipper-color/src/public_api';
import { FontModule } from 'projects/flipper-font/src/public_api';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DialogModule } from '@enexus/flipper-dialog';
import { VendorsModule } from '@enexus/flipper-vendors';


@NgModule({
  declarations: [
    AppComponent,
    TestingComponentComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    DialogModule,
    VendorsModule,
    ColorModule,
    FontModule,
    // FlipperButtonModule,
    // FlipperMenuModule,
    FlipperDashboardModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    //  overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }
}

