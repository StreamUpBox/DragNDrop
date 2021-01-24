import { FontSizeClassPipe } from './font-size-class.pipe'

describe('FontSizeClassPipe', () => {
  it('create an instance', () => {
    const pipe = new FontSizeClassPipe()
    expect(pipe).toBeTruthy()
    expect(pipe.transform('sm')).toBe('font-sm')
  })
})
