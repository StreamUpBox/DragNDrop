import {
  ArrayRemoveItemPipe
} from './array-remove-item.pipe';

describe('ArrayRemoveItemPipe', () => {
  let pipe = null;
  const array: any[] = [{
    id: 1,
    name: 'ganza'
  },
  {
    id: 2,
    name: 'res'
  }
];
  const element: object = {
  id: 2,
  name: 'res'
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


    expect(pipe.transform (array, element)).
    toEqual(
      [{
        id: 1,
        name: 'ganza'
      }
    ]
    );
  });
});
