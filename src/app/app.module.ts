<<<<<<< HEAD
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// import {AppComponent} from './app.component';
// import {NDropModule} from 'NDrop';
import { HttpModule, BrowserXhr } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './child/child.component';
import { LoadersDirective } from './loaders.directive';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DemoComponent } from './demo/demo.component';
// import { NUploadModule } from '../../projects/nupload/src/lib/nupload.module';
@NgModule({
    declarations: [
        // AppComponent,
        ChildComponent,
        LoadersDirective,
        DemoComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        // NDropModule,
        HttpModule,
        FormsModule,
        InfiniteScrollModule,
        // NUploadModule
    ],
    providers: [],

    bootstrap: [DemoComponent]
=======
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PharmacyPosModule } from 'pharmacy-pos';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PharmacyPosModule } from 'pharmacy-pos';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // PosModule.forRoot()
    PharmacyPosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
>>>>>>> b0c936dea4d40d142891f8d78ac09d7982c9271b
})
export class AppModule { }
