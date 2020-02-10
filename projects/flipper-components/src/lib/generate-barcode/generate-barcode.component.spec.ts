import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBarcodeComponent } from './generate-barcode.component';

describe('GenerateBarcodeComponent', () => {
  let component: GenerateBarcodeComponent;
  let fixture: ComponentFixture<GenerateBarcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateBarcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
