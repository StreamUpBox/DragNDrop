import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipperButtonComponent } from './flipper-button.component';
import { BasicRectangleButton } from './button.component';

describe('FlipperButtonComponent', () => {
  let component: FlipperButtonComponent;
  let fixture: ComponentFixture<FlipperButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlipperButtonComponent, BasicRectangleButton, BasicRectangleButton]
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
  it('should should fallback to square shape when no input is given', () => {
    // component.defaultButton();
    // if (component.shape == null || undefined) {
    //   expect(component.defaultButton()).toBe('rectangle');
    // }
    // if (component.shape = 'circle') {
    //   expect(component.defaultButton()).toBe('circle');
    // }
  });
});
