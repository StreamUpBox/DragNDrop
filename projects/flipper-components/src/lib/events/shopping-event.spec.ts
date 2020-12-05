import { ShoppingEvent } from './shopping-event'
import { Shoppings } from '../entries'

describe('ShoppingEvent', () => {
  it('should create an instance', () => {
    expect(new ShoppingEvent({} as Shoppings)).toBeTruthy()
  })
})
