import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'calculateTotalClass',
  pure: true,
})
@Injectable({
  providedIn: 'root'
})
export class CalculateTotalClassPipe implements PipeTransform {

  transform<T>(arrayOfdData: Array<T>, prop?: string): any {
    let total: any = 0.00;
    if (arrayOfdData.length > 0) {
      for (let i = 0, len = arrayOfdData.length; i < len; i++) {
        total += parseFloat(arrayOfdData[i][prop]);
      }
    }
    return total;
  }

}
