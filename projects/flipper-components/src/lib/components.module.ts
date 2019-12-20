import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { LazyIfDirective } from './lazy-if.directive';
import { VendorsModule } from '@enexus/flipper-vendors';
import { LoadingIconComponent } from './loading-icon/loading-icon.component';
import { RouterProgressComponent } from './router-progress/router-progress.component';
import { HeaderComponent } from './header/header.component';
import { TableOverlayComponent } from './table-overlay/table-overlay.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MessageComponent } from './message/message.component';
import { ColorModule } from '@enexus/flipper-color';
import { FlipperEventModule } from '@enexus/flipper-event';
import { DialogModule } from '@enexus/flipper-dialog';

@NgModule({
  imports: [
    CommonModule,
    VendorsModule,
    ColorModule,
    FlipperEventModule,
    DialogModule
  ],
  declarations: [
    LoadingIconComponent,
    RouterProgressComponent,
    HeaderComponent,
    TableOverlayComponent,
    SpinnerComponent,
    MessageComponent,
    LazyIfDirective,
  ],

  exports: [
    LoadingIconComponent,
    RouterProgressComponent,
    HeaderComponent,
    TableOverlayComponent,
    SpinnerComponent,
    MessageComponent,
    LazyIfDirective,
  ],
  entryComponents: [],
})
export class FlipperComponentsModule {
}
