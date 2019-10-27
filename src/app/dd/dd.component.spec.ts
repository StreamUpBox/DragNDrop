import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DDComponent } from './dd.component';

describe('DDComponent', () => {
  let component: DDComponent;
  let fixture: ComponentFixture<DDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DDComponent ]
    })
    .compileComponents();
  }));
  

  beforeEach(() => {
    fixture = TestBed.createComponent(DDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
