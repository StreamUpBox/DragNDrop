import { NgModule } from '@angular/core';
import { FlipperMenuComponent } from './flipper-menu.component';
import { CommonModule } from '@angular/common';
import { FlipperComponentsModule, PouchDBService } from '@enexus/flipper-components';
import { VendorsModule } from '@enexus/flipper-vendors';



@NgModule({
  declarations: [FlipperMenuComponent],
  imports: [
    CommonModule,
    VendorsModule,
    FlipperComponentsModule
  ],
  exports: [FlipperMenuComponent],
  providers: [PouchDBService],
})
export class FlipperMenuModule { }
