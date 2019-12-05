import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipperPosComponent } from './flipper-pos.component';

describe('FlipperPosComponent', () => {
  let component: FlipperPosComponent;
  let fixture: ComponentFixture<FlipperPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipperPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipperPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
