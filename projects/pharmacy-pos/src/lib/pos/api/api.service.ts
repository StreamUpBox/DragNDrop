import { Injectable } from '@angular/core';
import { API_ROUTES } from './api-routes.enum';
import { OrderItems } from '../cart/order_items';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../../importables/types/pagination-response';
import { Category } from '../../importables/categories/api/category';
import { LocalStorage } from '../../importables/services/local-storage.service';
import { AppHttpClient } from '../../importables/http/app-http-client.service';
import { CategoriesApiIndexParams } from '../../importables/store/model/pos-category-state-model';
import { Orders } from '../../importables/orders/orders';
import { BackendResponse } from '../../importables/types/backend-response';
import { StockApiIndexParams } from '../../importables/store/model/pos-stock-state-model';
import { Stock } from '../pos';
export interface CategoriesEntriesPaginationResponse extends PaginationResponse<Category> {
  categories?: Category[];
}

export interface StockEntriesPaginationResponse extends PaginationResponse<Stock> {
  stocks?: Stock[];
}

@Injectable({
    providedIn: 'root'
})
export class ApiPosService {

    constructor(private localStorage: LocalStorage,private http: AppHttpClient) {

    }

    public getCategoriesEntries(params: CategoriesApiIndexParams = {}): Observable<CategoriesEntriesPaginationResponse> {
      params.branch_id=parseInt(this.localStorage.get('active_branch'));
      return this.http.get('stock-categories', params);
    }

    public getMostSoldStockEntries(params: StockApiIndexParams = {}): Observable<StockEntriesPaginationResponse> {
      params.categoryId= this.localStorage.get('pos-categoryId');
      params.branch_id=parseInt(this.localStorage.get('active_branch'));
      return this.http.get("most-sold-stock", params);
    }
    public searchStockEntries(params: StockApiIndexParams = {}): Observable<StockEntriesPaginationResponse> {
      params.categoryId= this.localStorage.get('pos-categoryId');
      params.branch_id=parseInt(this.localStorage.get('active_branch'));
      return this.http.get("search-stock", params);
    }

    public getStockEntries(params: StockApiIndexParams = {}): Observable<StockEntriesPaginationResponse> {
      params.categoryId= this.localStorage.get('pos-categoryId');
      params.branch_id=parseInt(this.localStorage.get('active_branch'));
      return this.http.get("stock", params);
    }
    public showCategoriesEntries(id:number): Observable<Category> {
      return this.http.get('category/'+id);
    }


    public createOrder(params: Orders): BackendResponse<{ data: Orders }> {
        return this.http.post(API_ROUTES.ORDER, params);
    }
    public updateOrderItem(params: OrderItems): BackendResponse<{ data: OrderItems }> {
      return this.http.post(API_ROUTES.ORDERITEM, params);
  }
  public deleteOrderedItem(id): BackendResponse<{ data: OrderItems }> {
        return this.http.delete(API_ROUTES.DELETEORDEREDITEM+'/'+id);
     }
    public updateOrder(params: Orders,id:number): BackendResponse<{ data: Orders[] }> {
      return this.http.put(API_ROUTES.ORDER+'/'+id, params);
   }
   public deleteOrder(id:number): BackendResponse<{ data: Orders[] }> {
    return this.http.delete(API_ROUTES.ORDER+'/'+id);
 }
    public get(): BackendResponse<{ data: Orders []}> {
      return this.http.get(API_ROUTES.USERORDER);
    }

}
