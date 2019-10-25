import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { PharmacyPosModule } from 'pharmacy-pos';
import { YegoboxLoginModule } from 'yegobox-login';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // PosModule.forRoot()
    // PharmacyPosModule,
    YegoboxLoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
