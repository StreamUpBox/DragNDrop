import { MergeArryByIdPipe } from './merge-arry-by-id.pipe'

describe('MergeArryByIdPipe', () => {
  const pipe = new MergeArryByIdPipe()

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should merge two array by find similar id', () => {
    expect(
      pipe.transform(
        [
          { id: 1, name: 'ganza' },
          { id: 2, name: 'res' },
        ],
        [{ id: 2, name: 'res ganza' }]
      )
    ).toEqual([
      { id: 1, name: 'ganza' },
      { id: 2, name: 'res ganza' },
    ])
  })
})
