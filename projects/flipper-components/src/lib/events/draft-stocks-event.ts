import { BusEvent } from '@enexus/flipper-event'
import { Stock } from '../entries/stocks'

export class DraftStocksEvent extends BusEvent {
  public static readonly CHANNEL = 'draftStocks'

  constructor(public draftStocks: Stock[], public action: string = 'add') {
    super(DraftStocksEvent.CHANNEL)
  }
}
