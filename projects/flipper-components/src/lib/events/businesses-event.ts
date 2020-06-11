import { BusEvent } from '@enexus/flipper-event';
import { Business } from '../entries';


export class BusinessesEvent extends BusEvent {

  public static readonly CHANNEL = 'businesses';

  constructor(public businesses: Business[]) {
    super(BusinessesEvent.CHANNEL);
  }
}
