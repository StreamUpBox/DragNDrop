import { MatchHeightDirective } from './match-height.directive';
import { ElementRef } from '@angular/core';

describe('MatchHeightDirective', () => {
  it('should create an instance', () => {
    let el: ElementRef;
    const directive = new MatchHeightDirective(el);
    expect(directive).toBeTruthy();
  });
});
