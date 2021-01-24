import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { PrintBarcodeLabelsDialogComponent } from './print-barcode-labels-dialog.component'

describe('PrintBarcodeLabelsDialogComponent', () => {
  let component: PrintBarcodeLabelsDialogComponent
  let fixture: ComponentFixture<PrintBarcodeLabelsDialogComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrintBarcodeLabelsDialogComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintBarcodeLabelsDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
