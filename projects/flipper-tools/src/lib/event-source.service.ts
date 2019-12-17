import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {NativeEventSource, EventSourcePolyfill} from 'event-source-polyfill';
import { QueryParamsToStringPipe } from './query-params-to-string.pipe';

const EventSource = NativeEventSource || EventSourcePolyfill;

@Injectable({
  providedIn: 'root'
})
export class EventSourceService {

  constructor(private paramsToString: QueryParamsToStringPipe) {
  }

  newEventSource(path: string): EventSource {
    return new EventSource(path);
  }

  newObservable<R>(path: string,
                   options: { errorMessage?: string, params?: { [key in string]: string }, converter?: (data: string) => R }
                     = {}): Observable<R> {
    options = _.defaults(options, {
      errorMessage: '',
      converter: _.identity,
    });
    return new Observable(observer => {
      const eventSource = this.newEventSource(path + this.paramsToString.transform(options.params));
      eventSource.onmessage = event => {
        observer.next(options.converter(event.data));
      };
      eventSource.onerror = () => {
        if (eventSource.readyState !== eventSource.CONNECTING) {
          observer.error(options.errorMessage);
        }
        eventSource.close();
        observer.complete();
      };
      return () => {
        eventSource.close();
      };
    });
  }
}
