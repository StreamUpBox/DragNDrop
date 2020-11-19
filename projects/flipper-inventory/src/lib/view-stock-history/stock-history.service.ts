import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { StockHistory, Tables, Variant, PouchDBService } from '@enexus/flipper-components';
import { StockService } from '../services/stock.service';

@Injectable({
  providedIn: 'root'
})
export class StockHistoryService {
  variantsSubject: BehaviorSubject<StockHistory[]>;
  stockHistories:StockHistory[]=[];
  private readonly variantsMap = new Map<string, StockHistory>();
  constructor(
              private database: PouchDBService) {
    this.variantsSubject = new BehaviorSubject([]);
  }


 

  public  async loadAllStockHistories(variantIds){
    
    await  this.stockHistoriesList(variantIds);
      
   
   }
   public async stockHistoriesList(variantIds){
     return await this.database.query(['table','variantId'], {
       table: { $eq: 'stockHistories' },
       variantId: { $eq: variantIds }
     }).then(res => {
       if (res.docs && res.docs.length > 0) {
           this.stockHistories= res.docs as StockHistory[];
       } else {
         this.stockHistories= [] as StockHistory[];
       }
   });
   }

  public host(id: string): StockHistory | undefined {
    return this.variantsMap.get(id);
  }
  
}
