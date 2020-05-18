import { BusEvent } from '@enexus/flipper-event';
import { Product } from '../entries/product';

export class ProductsEvent extends BusEvent {

  public static readonly CHANNEL = 'products';

  constructor(public products: Product[]) {
    super(ProductsEvent.CHANNEL);
  }
}
