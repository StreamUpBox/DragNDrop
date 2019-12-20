import { BusEvent } from '@enexus/flipper-event';
import { CHANNELS } from './channels';

export class ShoppingEvent extends BusEvent {

    public static readonly CHANNEL = CHANNELS.SHOPPINGS;
  
    constructor() {
      super(ShoppingEvent.CHANNEL);
    }
  }
  