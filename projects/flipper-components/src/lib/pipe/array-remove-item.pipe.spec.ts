import {
  ArrayRemoveItemPipe
} from './array-remove-item.pipe';

describe('ArrayRemoveItemPipe', () => {
  let pipe = null;
  const array: any[] = [
            {
            id: 1,
            name: 'ganza'
            },
            {
            id: 2,
            name: 'remove'
            }
    ];
  const toBeremovedFromArray: object = {
              id: 2,
              name: 'remove'
            };
  pipe = new ArrayRemoveItemPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return empty array when passed empty array.', () => {
    const arr = [0];
    pipe.transform (arr, {});
    expect(arr.length).toBeTruthy();

    expect(pipe.transform ([], {})).
    toEqual([]);
  });

  it('should remove one item in array', () => {


    pipe.transform (array, toBeremovedFromArray); // ?
    expect(pipe.transform (array, toBeremovedFromArray)).
    toEqual(
      [{
        id: 1,
        name: 'ganza'
      }
    ]
    );
  });
});
