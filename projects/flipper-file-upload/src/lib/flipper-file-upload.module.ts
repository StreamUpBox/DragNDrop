import { NgModule } from '@angular/core';
import { FlipperFileUploadComponent } from './flipper-file-upload.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FlipperFileUploadComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [FlipperFileUploadComponent]
})
export class FlipperFileUploadModule { }
