import { BusEvent } from '@enexus/flipper-event';
import { CHANNELS } from './channels';
import { Shoppings } from '../entries';

export class ShoppingEvent extends BusEvent {

    public static readonly CHANNEL = CHANNELS.SHOPPINGS;

    constructor(public shopping: Shoppings) {
      super(ShoppingEvent.CHANNEL);
    }
  }

