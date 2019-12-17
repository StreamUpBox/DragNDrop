import {Injectable} from '@angular/core';
import { Retry } from './retry';

@Injectable({
  providedIn: 'root'
})
export class RetriesService {

  get() {
    return new Retry();
  }
}
