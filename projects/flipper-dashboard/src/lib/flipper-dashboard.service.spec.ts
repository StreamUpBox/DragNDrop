import { TestBed } from '@angular/core/testing'

import { FlipperDashboardService } from './flipper-dashboard.service'

describe('FlipperDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: FlipperDashboardService = TestBed.get(FlipperDashboardService)
    expect(service).toBeTruthy()
  })
})
