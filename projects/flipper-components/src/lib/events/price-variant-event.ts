import { BusEvent } from '@enexus/flipper-event';
import { CHANNELS } from './channels';

export class PriceVariantEvent extends BusEvent {

    public static readonly CHANNEL = CHANNELS.PRICEVARIANTS;
  
    constructor() {
      super(PriceVariantEvent.CHANNEL);
    }
  }
