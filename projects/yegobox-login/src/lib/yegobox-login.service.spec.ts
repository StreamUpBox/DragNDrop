import { TestBed } from '@angular/core/testing';

import { YegoboxLoginService } from './yegobox-login.service';

describe('YegoboxLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YegoboxLoginService = TestBed.get(YegoboxLoginService);
    expect(service).toBeTruthy();
  });
});
