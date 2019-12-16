import { FontWeightClassPipe } from "./font-weight-class.pipe";


describe('FontWeightClassPipe', () => {
  it('create an instance', () => {
    const pipe = new FontWeightClassPipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform('bold')).toBe('font-weight-bold');
  });
});
