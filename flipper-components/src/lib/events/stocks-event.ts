import { BusEvent } from '@enexus/flipper-event'
import { Stock } from '../entries/stocks'

export class StocksEvent extends BusEvent {
  public static readonly CHANNEL = 'stocks'

  constructor(public stocks: Stock[]) {
    super(StocksEvent.CHANNEL)
  }
}
