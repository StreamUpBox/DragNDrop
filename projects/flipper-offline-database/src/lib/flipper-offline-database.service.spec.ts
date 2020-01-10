import { TestBed } from '@angular/core/testing';

import { FlipperOfflineDatabaseService } from './flipper-offline-database.service';

describe('FlipperOfflineDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlipperOfflineDatabaseService = TestBed.get(FlipperOfflineDatabaseService);
    expect(service).toBeTruthy();
  });
});
