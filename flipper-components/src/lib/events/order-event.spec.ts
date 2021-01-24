import { OrderEvent } from './order-event'
import { Order } from '../entries/order'

describe('OrderEvent', () => {
  it('should create an instance', () => {
    expect(new OrderEvent({} as Order)).toBeTruthy()
  })
})
