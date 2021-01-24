import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipperFontComponent } from './flipper-font.component';

describe('FlipperFontComponent', () => {
  let component: FlipperFontComponent;
  let fixture: ComponentFixture<FlipperFontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlipperFontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipperFontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
