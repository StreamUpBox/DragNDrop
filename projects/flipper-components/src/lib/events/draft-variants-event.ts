import { BusEvent } from '@enexus/flipper-event';
import { Variant } from '../entries/variant';


export class DraftVariantsEvent extends BusEvent {

  public static readonly CHANNEL = 'draftVariants';

  constructor(public draftVariants: Variant[], public action: string= 'add') {
    super(DraftVariantsEvent.CHANNEL);
  }
}
