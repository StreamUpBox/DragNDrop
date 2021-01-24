import { TestBed } from '@angular/core/testing'

import { FlipperFileUploadService } from './flipper-file-upload.service'

describe('FlipperFileUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: FlipperFileUploadService = TestBed.get(FlipperFileUploadService)
    expect(service).toBeTruthy()
  })
})
