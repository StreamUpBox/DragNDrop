import { FlipperPosModule } from '@enexus/flipper-pos'

describe('FlipperPosModule', () => {
  let layoutModule: FlipperPosModule

  beforeEach(() => {
    layoutModule = new FlipperPosModule()
  })

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy()
  })
})
