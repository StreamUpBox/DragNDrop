import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipperButtonComponent } from './flipper-button.component';

describe('FlipperButtonComponent', () => {
  let component: FlipperButtonComponent;
  let fixture: ComponentFixture<FlipperButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipperButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipperButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
