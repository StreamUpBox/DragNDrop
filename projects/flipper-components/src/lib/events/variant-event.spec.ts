import { VariantEvent } from './variant-event';
import { Variant } from '../entries/variant';

describe('VariantEvent', () => {
  it('should create an instance', () => {
    expect(new VariantEvent({} as Variant)).toBeTruthy();
  });
});
