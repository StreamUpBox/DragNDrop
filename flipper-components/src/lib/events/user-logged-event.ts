import { BusEvent } from '@enexus/flipper-event'
import { User } from '../entries'

export class UserLoggedEvent extends BusEvent {
  public static readonly CHANNEL = 'current-user'

  constructor(public user: User) {
    super(UserLoggedEvent.CHANNEL)
  }
}
