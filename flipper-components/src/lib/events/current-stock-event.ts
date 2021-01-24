import { BusEvent } from '@enexus/flipper-event'
import { Stock } from '../entries/stocks'

export class CurrentStockEvent extends BusEvent {
  public static readonly CHANNEL = 'currentStock'

  constructor(public currentStock: Stock, public action: string = 'add') {
    super(CurrentStockEvent.CHANNEL)
  }
}
