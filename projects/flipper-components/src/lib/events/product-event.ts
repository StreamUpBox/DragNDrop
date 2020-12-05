import { BusEvent } from '@enexus/flipper-event'
import { CHANNELS } from './channels'
import { Product } from '../entries'

export class ProductEvent extends BusEvent {
  public static readonly CHANNEL = CHANNELS.PRODUCTS

  constructor(public product: Product) {
    super(ProductEvent.CHANNEL)
  }
}
