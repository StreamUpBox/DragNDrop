import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FlipperMenuModule } from 'flipper-menu';
import { TestingComponentComponent } from './testing-component/testing-component.component';


@NgModule({
  declarations: [
    AppComponent,
    TestingComponentComponent
  ],
  imports: [
    BrowserModule,
    FlipperMenuModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

