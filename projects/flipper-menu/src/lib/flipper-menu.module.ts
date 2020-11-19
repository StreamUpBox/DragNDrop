import { NgModule } from '@angular/core';
import { FlipperMenuComponent } from './flipper-menu.component';
import { CommonModule } from '@angular/common';
import { FlipperComponentsModule, PouchDBService } from '@enexus/flipper-components';
import { VendorsModule } from '@enexus/flipper-vendors';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FlipperMenuComponent],
  imports: [
    CommonModule,
    VendorsModule,
    FlipperComponentsModule,
    RouterModule
  ],
  exports: [FlipperMenuComponent],
  providers: [PouchDBService],
})
export class FlipperMenuModule { }
