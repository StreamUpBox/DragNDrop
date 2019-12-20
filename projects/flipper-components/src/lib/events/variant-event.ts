import { BusEvent } from '@enexus/flipper-event';
import { CHANNELS } from './channels';
import { Variant } from '../entries/variant';

export class VariantEvent extends BusEvent {

    public static readonly CHANNEL = CHANNELS.VARIANTS;

    constructor(public variant:Variant) {
      super(VariantEvent.CHANNEL);
    }
  }

