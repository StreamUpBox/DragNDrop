import { ShoppingEvent } from './shopping-event';
import { Shopping } from '../entries';

describe('ShoppingEvent', () => {
  it('should create an instance', () => {
    expect(new ShoppingEvent({} as Shopping)).toBeTruthy();
  });
});
