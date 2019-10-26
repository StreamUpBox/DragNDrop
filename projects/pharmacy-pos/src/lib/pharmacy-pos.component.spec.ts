import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyPosComponent } from './pharmacy-pos.component';

describe('PharmacyPosComponent', () => {
  let component: PharmacyPosComponent;
  let fixture: ComponentFixture<PharmacyPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyPosComponent ]
    })
    .compileComponents();
  }));
  

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
