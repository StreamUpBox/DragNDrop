import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { VendorsModule } from '@enexus/flipper-vendors'
import { FlipperComponentsModule, PouchDBService } from '@enexus/flipper-components'
import { FlipperInventoryModule } from '@enexus/flipper-inventory'
import { AppRoutingModule } from './app-routing.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    VendorsModule,
    AppRoutingModule,
    FlipperComponentsModule,
    FlipperInventoryModule,
    BrowserAnimationsModule,
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
