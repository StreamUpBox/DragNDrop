import { BusEvent } from '@enexus/flipper-event'
import { CHANNELS } from './channels'
import { Order } from '../entries/order'

export class OrderEvent extends BusEvent {
  public static readonly CHANNEL = CHANNELS.ORDER

  constructor(public order: Order) {
    super(OrderEvent.CHANNEL)
  }
}
