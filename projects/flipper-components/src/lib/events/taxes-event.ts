import { BusEvent } from '@enexus/flipper-event';
import { Taxes } from '../entries/taxes';

export class TaxesEvent extends BusEvent {

  public static readonly CHANNEL = 'taxes';

  constructor(public taxes: Taxes[], public action: string= 'add') {
    super(TaxesEvent.CHANNEL);
  }
}
