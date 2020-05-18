import { BusEvent } from '@enexus/flipper-event';
import { Variant } from '../entries/variant';


export class VariantsEvent extends BusEvent {

  public static readonly CHANNEL = 'variants';

  constructor(public variants: Variant[]) {
    super(VariantsEvent.CHANNEL);
  }
}
