import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatOptionModule, MatCommonModule, MatRippleModule, MatNativeDateModule } from '@angular/material/core'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule, MatIconRegistry } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatStepperModule } from '@angular/material/stepper'
import { MatTableModule } from '@angular/material/table'
import { MAT_TABS_CONFIG, MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatTreeModule } from '@angular/material/tree'
import { A11yModule } from '@angular/cdk/a11y'
import { PortalModule } from '@angular/cdk/portal'
import { OverlayModule } from '@angular/cdk/overlay'

import { ObserversModule } from '@angular/cdk/observers'
import { BidiModule } from '@angular/cdk/bidi'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatChipsModule } from '@angular/material/chips'
import { MatSliderModule } from '@angular/material/slider'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatRadioModule } from '@angular/material/radio'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'

@NgModule({
  imports: [
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTreeModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatExpansionModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatStepperModule,
    MatPaginatorModule,
    MatSortModule,
    MatOptionModule,
    MatDialogModule,
    MatListModule,
    MatButtonToggleModule,
    A11yModule,
    PortalModule,
    OverlayModule,

    MatAutocompleteModule,
    MatChipsModule,
    MatDatepickerModule,
    MatTableModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatNativeDateModule,
    MatStepperModule,
    MatRadioModule,
    BidiModule,
    MatCommonModule,
    ObserversModule,
    MatBottomSheetModule,
  ],
  exports: [
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatTreeModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatExpansionModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatStepperModule,
    MatPaginatorModule,
    MatSortModule,
    MatOptionModule,
    MatDialogModule,
    MatListModule,
    MatButtonToggleModule,
    A11yModule,
    PortalModule,
    OverlayModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDatepickerModule,
    MatTableModule,

    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,

    MatSidenavModule,
    MatSliderModule,
    MatNativeDateModule,
    MatStepperModule,
    MatRadioModule,
    MatGridListModule,
    MatBottomSheetModule,
    BidiModule,
    MatCommonModule,
    ObserversModule,
  ],
  providers: [
    MatIconRegistry,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2000,
      },
    },
    {
      provide: MAT_TABS_CONFIG,
      useValue: {
        animationDuration: '0ms',
      },
    },
  ],
})
export class MaterialModule {
  // Material icon are visible here https://material.io/tools/icons/?style=baseline
}
