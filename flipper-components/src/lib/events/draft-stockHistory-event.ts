import { BusEvent } from '@enexus/flipper-event'
import { StockHistory } from '../entries/stock-history'

export class DraftStockHistoryEvent extends BusEvent {
  public static readonly CHANNEL = 'draftStockHistory'

  constructor(public draftStockHistory: StockHistory[], public action: string = 'add') {
    super(DraftStockHistoryEvent.CHANNEL)
  }
}
