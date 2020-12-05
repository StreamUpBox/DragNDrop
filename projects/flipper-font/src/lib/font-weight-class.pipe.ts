import { Pipe, PipeTransform } from '@angular/core'
import { Font } from './font'

@Pipe({
  name: 'fontWeightClass',
  pure: true,
})
export class FontWeightClassPipe implements PipeTransform {
  transform(value: Font): any {
    return `font-weight-${value}`
  }
}
