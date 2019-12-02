import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipperMenuComponent } from './flipper-menu.component';

describe('FlipperMenuComponent', () => {
  let component: FlipperMenuComponent;
  let fixture: ComponentFixture<FlipperMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipperMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipperMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
