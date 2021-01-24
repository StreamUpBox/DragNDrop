import { BusEvent } from '@enexus/flipper-event'
import { Subscription } from '../entries'

export class UserSubscriptionEvent extends BusEvent {
  public static readonly CHANNEL = 'user-subscription'

  constructor(public subscription: Subscription) {
    super(UserSubscriptionEvent.CHANNEL)
  }
}
