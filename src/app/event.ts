import { BusEvent } from 'projects/flipper-event/src/public_api';

export class OrderEvent extends BusEvent {

  public static readonly CHANNEL = 'order';

  constructor(public order: {id: number, orderno: string, reference: string}) {
    super(OrderEvent.CHANNEL);
  }
}


export class ProductsEvent extends BusEvent {

  public static readonly CHANNEL = 'products';

  constructor(public order: {id: number, orderno: string, reference: string}) {
    super(OrderEvent.CHANNEL);
  }
}
