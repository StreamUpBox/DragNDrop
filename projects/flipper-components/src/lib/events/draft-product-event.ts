import { BusEvent } from '@enexus/flipper-event';
import { Product } from '../entries/product';


export class DraftProductEvent extends BusEvent {

  public static readonly CHANNEL = 'draftProduct';

  constructor(public draftProduct: Product, public action: string= 'add') {
    super(DraftProductEvent.CHANNEL);
  }
}
