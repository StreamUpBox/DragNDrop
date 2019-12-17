import {inject, TestBed} from '@angular/core/testing';

import {FlipperEventBusService} from './event-bus.service';
import {BusEvent} from './bus-event';
import {EMPTY} from 'rxjs';

export const eventBusSpy = () => {
  const spy = jasmine.createSpyObj('FlipperEventBusService', ['publish', 'of']);
  spy.of.and.returnValue(EMPTY);
  return spy;
};

class TestMessage extends BusEvent {
  constructor(public testStr: string) {
    super('test');
  }
}

describe('FlipperEventBusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlipperEventBusService]
    });
  });

  it('should be created', inject([FlipperEventBusService], (service: FlipperEventBusService) => {
    const testSubscription = service.of<TestMessage>('test').subscribe(message => {
      expect(message.testStr).toBe('toto');
    });
    service.publish(new TestMessage('toto'));
    testSubscription.unsubscribe();
  }));
});
