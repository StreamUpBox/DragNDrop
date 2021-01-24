import { PriceEvent } from './price-event'
import { Price } from '../entries'

describe('PriceEvent', () => {
  it('should create an instance', () => {
    expect(new PriceEvent({} as Price)).toBeTruthy()
  })
})
