import { BusEvent } from '@enexus/flipper-event'
import { Taxes } from '../entries/taxes'

export class DefaultTaxesEvent extends BusEvent {
  public static readonly CHANNEL = 'defaultTax'

  constructor(public defaultTax: Taxes, public action: string = 'add') {
    super(DefaultTaxesEvent.CHANNEL)
  }
}
