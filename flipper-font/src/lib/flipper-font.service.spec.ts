import { TestBed } from '@angular/core/testing';

import { FlipperFontService } from './flipper-font.service';

describe('FlipperFontService', () => {
  let service: FlipperFontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlipperFontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
