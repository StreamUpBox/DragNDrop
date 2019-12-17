import { FlipperComponentsModule } from '../public_api';

describe('FlipperComponentsModule', () => {
  let layoutModule: FlipperComponentsModule;

  beforeEach(() => {
    layoutModule = new FlipperComponentsModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
