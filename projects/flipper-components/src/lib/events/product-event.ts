import { BusEvent } from '@enexus/flipper-event';
import { CHANNELS } from './channels';

export class ProductEvent extends BusEvent {

    public static readonly CHANNEL = CHANNELS.PRODUCTS;
  
    constructor() {
      super(ProductEvent.CHANNEL);
    }
  }
  
