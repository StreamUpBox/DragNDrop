import { ProductEvent } from './product-event';
import { Product } from '../entries';

describe('ProductEvent', () => {
  it('should create an instance', () => {
    expect(new ProductEvent({} as Product)).toBeTruthy();
  });
});
