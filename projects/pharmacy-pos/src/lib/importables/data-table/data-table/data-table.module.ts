import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../data-table.component';
import { MaterialModule } from '../../material/material.module';
import { UiModule } from '../../ui/ui.module';

@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UiModule
  ],
  exports:[DataTableComponent]
})
export class DataTableModule {

}
