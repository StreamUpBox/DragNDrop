import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipperDashboardComponent } from './flipper-dashboard.component';

describe('FlipperDashboardComponent', () => {
  let component: FlipperDashboardComponent;
  let fixture: ComponentFixture<FlipperDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipperDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipperDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
