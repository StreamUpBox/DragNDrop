import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TestingComponentComponent } from './testing-component/testing-component.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlipperDashboardModule } from 'flipper-dashboard';
import { DialogComponent } from './dialog/dialog.component';
import { ColorModule } from '@enexus/flipper-color';
import { FontModule } from '@enexus/flipper-font';
import { OverlayContainer } from '@angular/cdk/overlay';
import { VendorsModule } from '@enexus/flipper-vendors';
import { FlipperMenuModule } from 'flipper-menu';
import { FlipperPosModule } from '@enexus/flipper-pos';
import { FlipperEventModule } from '@enexus/flipper-event';
import { DialogModule } from '@enexus/flipper-dialog';


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
    FlipperMenuModule,
    FlipperDashboardModule,
    FlipperEventModule,
    FlipperPosModule,
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

