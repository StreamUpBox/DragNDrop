import { Injectable } from '@angular/core';
import { API_ROUTES_CUSTOMER_TYPE } from './api-routes.enum';
import { CustomerType } from './CustomerType';
import { CustomerTypePrices } from './CustomerTypePrices';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../../types/pagination-response';
import { AppHttpClient } from '../../http/app-http-client.service';
import { BackendResponse } from '../../types/backend-response';

export interface CustomerTypeEntriesPaginationResponse extends PaginationResponse<CustomerType> {
  customer_types?: CustomerType[];
}
@Injectable({
    providedIn: 'root'
})
export class ApiCustomerTypeService {
    constructor(private http: AppHttpClient) {}


  public create(params: CustomerType): Observable<CustomerType> {
        return this.http.post(API_ROUTES_CUSTOMER_TYPE.CUSTOMER_TYPE, params);
    }
  public get(): Observable<CustomerTypeEntriesPaginationResponse> {
      return this.http.get(API_ROUTES_CUSTOMER_TYPE.CUSTOMER_TYPE);
  }

  public update(id:number,params: CustomerType): Observable<CustomerType> {
    return this.http.put(API_ROUTES_CUSTOMER_TYPE.CUSTOMER_TYPE+'/'+id, params);
 }
 public createItemPricesByCustomerType(params: any): BackendResponse<{ data: any }> {
  return this.http.post(API_ROUTES_CUSTOMER_TYPE.ATTACH_ITEM_CUSTOMER_TYPE_PRICE, params);
}

 public updateItemPricesByCustomerType(params: CustomerTypePrices,id:number): Observable<CustomerType> {
  return this.http.put(API_ROUTES_CUSTOMER_TYPE.ITEM_CUSTOMER_TYPE_PRICES+'/'+id, params);
}
 //update-item-customertype-prices
 public delete(id:number): BackendResponse<{ data: CustomerType }> {
  return this.http.delete(API_ROUTES_CUSTOMER_TYPE.CUSTOMER_TYPE+'/'+id);
}
public detachItemCustomerTypePrice(id:number){
  return this.http.delete(API_ROUTES_CUSTOMER_TYPE.DETACH_ITEM_CUSTOMER_TYPE_PRICE+'/'+id);
}

public deleteMultiple(ids: number[]) {
  return this.http.delete(API_ROUTES_CUSTOMER_TYPE.DELETE_MULTIPLE, {ids});
}
}
