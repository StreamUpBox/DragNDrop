import { CalculateTotalClassPipe } from "./calculate-total-class.pipe";


describe('CalculateTotalClassPipe', () => {
  it('create an instance', () => {
    const pipe = new CalculateTotalClassPipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform([{id:1,
      price:100,
      variantName:'x',
      quantity:1,
      variantId:1,
      orderId:1,
      subTotal:100
    }],'subTotal')).toBe(100);
  });
});

