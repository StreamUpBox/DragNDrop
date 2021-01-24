import { RoundNumberPipe } from './round-number.pipe'

describe('RoundNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new RoundNumberPipe()
    expect(pipe).toBeTruthy()
    expect(pipe.transform(1000, 2)).toBe('1,000.00')
    expect(pipe.transform(1000, 1)).toBe('1,000.0')
    expect(pipe.transform(1000, 3)).toBe('1,000.000')
    expect(pipe.transform(100, 0)).toBe('100')
  })
})
