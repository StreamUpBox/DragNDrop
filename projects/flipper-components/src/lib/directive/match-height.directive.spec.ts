import { MatchHeightDirective } from './match-height.directive';
import { ElementRef } from '@angular/core';

describe('MatchHeightDirective', () => {
  it('should create an instance', () => {
    const el: ElementRef = null;
    const directive = new MatchHeightDirective(el);
    expect(directive).toBeTruthy();
  });
});
