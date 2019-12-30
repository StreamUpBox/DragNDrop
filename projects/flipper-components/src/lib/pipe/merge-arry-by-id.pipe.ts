import { Pipe, PipeTransform, Injectable } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'mergeArryById'
})
@Injectable({
  providedIn: 'root'
})
export class MergeArryByIdPipe implements PipeTransform {

  transform<T>(originArrayData: Array<T>, mergeArrayData: Array<T>): Array<T> {
    return this.mergeById(originArrayData)
    .with(mergeArrayData);
  }
  
  mergeById(arr) {
    return {
      with: function(arr2) {
        return _.map(arr, item => {
          return _.find(arr2, obj => obj.id === item.id) || item
        })
      }
    }
  }
}
