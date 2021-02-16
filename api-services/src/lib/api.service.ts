import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Variant,Analytic } from '@enexus/flipper-components';
// This injection token can be used to configure the Providers as well as the @Inject()
// meta-data that will tell the dependency-injection container how to locate the desired
// class instance.
//
import * as Sentry from "@sentry/angular";
import { flipperUrl } from './constants'
var ApiToken = new InjectionToken<ApiInterface>("api");
interface ApiInterface {
  getAnalytics(): Promise<Analytic>;
  searchQuery(key:string):Promise<Variant[]|any[]>;
}

@Injectable({
  providedIn: 'root'
})
export class APIService implements ApiInterface {

  searchResult:Variant[] =[];

  constructor(private http: HttpClient){

  }
  async searchQuery(key:string): Promise<Variant[]|any[]> { //we just get all variant then filter is done on client side for now!
    this.searchResult = []; // make sure to start a search by emptying the value of []
    return await this.http
    .get<Variant[]>(flipperUrl + '/api/variants')
    .toPromise()
    .then((variants:Variant[]) => {
      return this.searchResult = variants;
    });
  }
  
  async getAnalytics(): Promise<Analytic|any> {
    return await this.http
    .get<Analytic>(flipperUrl + '/api/analytics')
    .toPromise()
    .then((analytic:Analytic) => {
      return analytic;
    }).catch((error:any)=> {
      Sentry.captureException(error);
    });
  }
}
