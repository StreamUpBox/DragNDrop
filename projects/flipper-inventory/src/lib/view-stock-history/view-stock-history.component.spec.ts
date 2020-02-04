import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStockHistoryComponent } from './view-stock-history.component';

describe('ViewStockHistoryComponent', () => {
  let component: ViewStockHistoryComponent;
  let fixture: ComponentFixture<ViewStockHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStockHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStockHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
