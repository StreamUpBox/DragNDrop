import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestlivereloadComponent } from './testlivereload.component';

describe('TestlivereloadComponent', () => {
  let component: TestlivereloadComponent;
  let fixture: ComponentFixture<TestlivereloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestlivereloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestlivereloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
