import { TestBed } from '@angular/core/testing'

import { FlipperButtonService } from './flipper-button.service'

describe('FlipperButtonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: FlipperButtonService = TestBed.get(FlipperButtonService)
    expect(service).toBeTruthy()
  })
})
