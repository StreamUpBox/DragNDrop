import { BusEvent } from '@enexus/flipper-event'
import { Branch } from '../entries'

export class CurrentBranchEvent extends BusEvent {
  public static readonly CHANNEL = 'current-branch'

  constructor(public branch: Branch, public action: string = 'add') {
    super(CurrentBranchEvent.CHANNEL)
  }
}
