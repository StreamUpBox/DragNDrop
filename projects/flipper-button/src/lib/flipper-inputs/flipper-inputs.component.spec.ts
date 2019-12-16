import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipperInputsComponent } from './flipper-inputs.component';

describe('FlipperInputsComponent', () => {
  let component: FlipperInputsComponent;
  let fixture: ComponentFixture<FlipperInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipperInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipperInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
