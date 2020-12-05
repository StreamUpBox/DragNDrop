import { AppModule } from './app.module'

describe('AppModule', () => {
  let layoutModule: AppModule

  beforeEach(() => {
    layoutModule = new AppModule()
  })

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy()
  })
})
