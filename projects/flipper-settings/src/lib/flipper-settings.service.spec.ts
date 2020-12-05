import { TestBed } from '@angular/core/testing'

import { FlipperSettingsService } from './flipper-settings.service'

describe('FlipperSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: FlipperSettingsService = TestBed.get(FlipperSettingsService)
    expect(service).toBeTruthy()
  })
})
