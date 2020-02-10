import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartItemDialogComponent } from './add-cart-item-dialog.component';

describe('AddCartItemDialogComponent', () => {
  let component: AddCartItemDialogComponent;
  let fixture: ComponentFixture<AddCartItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCartItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCartItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
