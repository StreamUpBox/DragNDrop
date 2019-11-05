import { TestBed } from '@angular/core/testing';

import { PharmacyPosService } from './pharmacy-pos.service';

describe('PharmacyPosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PharmacyPosService = TestBed.get(PharmacyPosService);
    expect(service).toBeTruthy();
  });
});
