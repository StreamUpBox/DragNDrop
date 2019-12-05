import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FlipperMenuModule } from 'flipper-menu';
import { AppRoutingModule } from './app-routing.module';
import { TestingComponentComponent } from './testing-component/testing-component.component';
<<<<<<< HEAD
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
=======
>>>>>>> b9c0f83f7ba771da34158eb75f74d46609f2763c


@NgModule({
  declarations: [
    AppComponent,
    TestingComponentComponent
  ],
  imports: [
    BrowserModule,
    FlipperMenuModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

