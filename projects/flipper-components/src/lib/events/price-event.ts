import { BusEvent } from '@enexus/flipper-event';
import { CHANNELS } from './channels';
import { Price } from '../entries';

export class PriceEvent extends BusEvent {

    public static readonly CHANNEL = CHANNELS.PRICES;

    constructor(public price:Price) {
      super(PriceEvent.CHANNEL);
    }
  }
