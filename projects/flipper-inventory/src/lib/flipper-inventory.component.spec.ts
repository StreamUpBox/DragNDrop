import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipperInventoryComponent } from './flipper-inventory.component';

describe('FlipperInventoryComponent', () => {
  let component: FlipperInventoryComponent;
  let fixture: ComponentFixture<FlipperInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipperInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipperInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
