import { BusEvent } from '@enexus/flipper-event';
import { CHANNELS } from './channels';

export class VariantEvent extends BusEvent {

    public static readonly CHANNEL = CHANNELS.VARIANTS;
  
    constructor() {
      super(VariantEvent.CHANNEL);
    }
  }
  
