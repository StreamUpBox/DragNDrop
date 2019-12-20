import { BusEvent } from '@enexus/flipper-event';
import { CHANNELS } from './channels';

export class OrderEvent extends BusEvent {

    public static readonly CHANNEL = CHANNELS.ORDER;
  
    constructor() {
      super(OrderEvent.CHANNEL);
    }
  }
