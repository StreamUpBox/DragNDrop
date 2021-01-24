import { FindKeyPipe } from './find-key.pipe'

describe('FindKeyPipe', () => {
  it('create an instance', () => {
    const pipe = new FindKeyPipe()
    expect(pipe).toBeTruthy()
    expect(pipe.transform(['1', '2'], '2')).toBeTruthy()
    expect(pipe.transform(['1', '2'], '3')).toBeFalsy()
  })
})
