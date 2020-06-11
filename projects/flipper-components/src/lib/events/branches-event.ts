import { BusEvent } from '@enexus/flipper-event';
import { Branch } from '../entries/branch';


export class BranchesEvent extends BusEvent {

  public static readonly CHANNEL = 'branches';

  constructor(public branches: Branch[]) {
    super(BranchesEvent.CHANNEL);
  }
}
