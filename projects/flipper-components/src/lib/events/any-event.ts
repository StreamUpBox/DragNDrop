import { BusEvent } from '@enexus/flipper-event'

export class AnyEvent extends BusEvent {
  public static readonly CHANNEL = 'any-event'

  constructor(public any_event: any) {
    super(AnyEvent.CHANNEL)
  }
}
