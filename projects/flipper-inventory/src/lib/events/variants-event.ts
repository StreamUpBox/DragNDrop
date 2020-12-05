import { BusEvent } from '@enexus/flipper-event'
import { Variant } from '@enexus/flipper-components'

export class VariantsEvent extends BusEvent {
  public static readonly CHANNEL = 'variants-event'

  constructor(public content: Variant[]) {
    super(VariantsEvent.CHANNEL)
  }
}
