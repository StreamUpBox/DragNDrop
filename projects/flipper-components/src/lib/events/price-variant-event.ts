import { BusEvent } from '@enexus/flipper-event'
import { CHANNELS } from './channels'
import { PriceVariant } from '../entries'

export class PriceVariantEvent extends BusEvent {
  public static readonly CHANNEL = CHANNELS.PRICEVARIANTS

  constructor(public priceVariant: PriceVariant) {
    super(PriceVariantEvent.CHANNEL)
  }
}
