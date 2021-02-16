import { BusEvent } from "@enexus/flipper-event"

export class SearchedItemEvent extends BusEvent {
  public static readonly CHANNEL = 'searched-item'

  constructor(public variants: any[]) {
    super(SearchedItemEvent.CHANNEL)
  }
}
