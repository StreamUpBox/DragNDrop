import { BusEvent } from '@enexus/flipper-event';


export class ErrorMessageEvent extends BusEvent {

    public static readonly CHANNEL = 'errorMessage';

    constructor(public errorMessage: any) {
      super(ErrorMessageEvent.CHANNEL);
    }
  }

