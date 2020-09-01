import { TestBed } from '@angular/core/testing';

import { FlipperInventoryService } from './flipper-inventory.service';

describe('FlipperInventoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlipperInventoryService = TestBed.get(FlipperInventoryService);
    expect(service).toBeTruthy();
  });
});
