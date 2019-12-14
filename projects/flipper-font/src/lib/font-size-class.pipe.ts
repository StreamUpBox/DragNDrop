import { Pipe, PipeTransform } from '@angular/core';
import { Font } from './font';

@Pipe({
  name: 'fontSizeClass',
  pure: true,
})
export class FontSizeClassPipe implements PipeTransform {

  transform(value: Font): any {
    return `font-${value}`;
  }

}
