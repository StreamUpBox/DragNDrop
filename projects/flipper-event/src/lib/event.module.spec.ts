import { FlipperEventModule } from './event.module';

describe('FlipperEventModule', () => {
  let eventsModule: FlipperEventModule;

  beforeEach(() => {
    eventsModule = new FlipperEventModule();
  });

  it('should create an instance', () => {
    expect(eventsModule).toBeTruthy();
  });
});
