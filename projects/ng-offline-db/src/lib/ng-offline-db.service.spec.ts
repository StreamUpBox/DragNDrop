import { TestBed } from '@angular/core/testing';

import { NgOfflineDbService } from './ng-offline-db.service';

describe('NgOfflineDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  
  it('should be created', () => {
    const service: NgOfflineDbService = TestBed.get(NgOfflineDbService);
    expect(service).toBeTruthy();
  });
});
