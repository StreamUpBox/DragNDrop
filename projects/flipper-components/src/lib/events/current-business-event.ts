import { BusEvent } from '@enexus/flipper-event';
import { Business } from '../entries';


export class CurrentBusinessEvent extends BusEvent {

  public static readonly CHANNEL = 'current-business';


  constructor(public business: Business, public action: string= 'add') {
    super(CurrentBusinessEvent.CHANNEL);
  }
}
