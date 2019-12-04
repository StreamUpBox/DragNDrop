import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YegoboxLoginComponent } from './yegobox-login.component';

describe('YegoboxLoginComponent', () => {
  let component: YegoboxLoginComponent;
  let fixture: ComponentFixture<YegoboxLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YegoboxLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YegoboxLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
