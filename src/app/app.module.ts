import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FlipperMenuModule } from 'flipper-menu';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlipperMenuModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

