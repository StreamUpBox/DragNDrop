import { PriceVariantEvent } from './price-variant-event';
import { PriceVariant } from '../entries';

describe('PriceVariantEvent', () => {
  it('should create an instance', () => {
    expect(new PriceVariantEvent({} as PriceVariant)).toBeTruthy();
  });
});
