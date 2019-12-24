import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateTotalClass',
  pure: true,
})
export class CalculateTotalClassPipe implements PipeTransform {

  transform<T>(arrayOfdData:Array<T>,prop?:string): any {
    var total:any = 0.00;
    if (arrayOfdData.length > 0) {
      for (var i = 0, _len = arrayOfdData.length; i < _len; i++) {
        total += arrayOfdData[i][prop]
      }
    }
    return total;
  }

}
