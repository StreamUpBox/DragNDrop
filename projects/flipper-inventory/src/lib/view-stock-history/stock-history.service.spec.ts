import { TestBed } from '@angular/core/testing';

import { StockHistoryService } from './stock-history.service';

describe('StockHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockHistoryService = TestBed.get(StockHistoryService);
    expect(service).toBeTruthy();
  });
});
