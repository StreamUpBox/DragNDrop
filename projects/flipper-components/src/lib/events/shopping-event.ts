import { BusEvent } from '@enexus/flipper-event';
import { CHANNELS } from './channels';
import { Shopping } from '../entries';

export class ShoppingEvent extends BusEvent {

    public static readonly CHANNEL = CHANNELS.SHOPPINGS;

    constructor(public shopping:Shopping) {
      super(ShoppingEvent.CHANNEL);
    }
  }

