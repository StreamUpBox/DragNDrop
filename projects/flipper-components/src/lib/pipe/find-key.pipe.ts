import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'findKey',
  pure: true,
})
@Injectable({
  providedIn: 'root'
})
export class FindKeyPipe implements PipeTransform {

  transform(numKeys: any[], key: any): boolean {
    return numKeys.find(k => k === key) ? true : false;
  }

}
