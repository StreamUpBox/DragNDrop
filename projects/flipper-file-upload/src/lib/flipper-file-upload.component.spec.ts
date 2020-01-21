import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipperFileUploadComponent } from './flipper-file-upload.component';

describe('FlipperFileUploadComponent', () => {
  let component: FlipperFileUploadComponent;
  let fixture: ComponentFixture<FlipperFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipperFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipperFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
