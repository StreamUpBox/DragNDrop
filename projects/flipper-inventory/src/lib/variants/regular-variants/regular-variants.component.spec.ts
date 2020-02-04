import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularVariantsComponent } from './regular-variants.component';

describe('RegularVariantsComponent', () => {
  let component: RegularVariantsComponent;
  let fixture: ComponentFixture<RegularVariantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularVariantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
