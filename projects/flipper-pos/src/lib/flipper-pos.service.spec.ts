import { TestBed } from '@angular/core/testing';

import { FlipperPosService } from './flipper-pos.service';

describe('FlipperPosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlipperPosService = TestBed.get(FlipperPosService);
    expect(service).toBeTruthy();
  });
});
