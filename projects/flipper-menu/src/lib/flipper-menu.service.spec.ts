import { TestBed } from '@angular/core/testing';

import { FlipperMenuService } from './flipper-menu.service';

describe('FlipperMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlipperMenuService = TestBed.get(FlipperMenuService);
    expect(service).toBeTruthy();
  });
});
