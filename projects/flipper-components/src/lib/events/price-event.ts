import { BusEvent } from '@enexus/flipper-event';
import { CHANNELS } from './channels';

export class PriceEvent extends BusEvent {

    public static readonly CHANNEL = CHANNELS.PRICES;
  
    constructor() {
      super(PriceEvent.CHANNEL);
    }
  }
