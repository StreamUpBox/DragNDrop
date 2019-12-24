import { RoundNumberPipe } from './round-number.pipe';

describe('RoundNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new RoundNumberPipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform(1000, 2)).toBe('1,000.00');
  });
});
