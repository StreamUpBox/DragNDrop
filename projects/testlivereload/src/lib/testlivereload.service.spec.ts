import { TestBed } from '@angular/core/testing';

import { TestlivereloadService } from './testlivereload.service';

describe('TestlivereloadService', () => {
  let service: TestlivereloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestlivereloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
