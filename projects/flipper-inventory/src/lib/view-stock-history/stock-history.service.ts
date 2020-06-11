import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StockHistory, MainModelService, Tables, Variant, PouchDBService } from '@enexus/flipper-components';
import { StockService } from '../services/stock.service';

@Injectable({
  providedIn: 'root'
})
export class StockHistoryService {
  variantsSubject: BehaviorSubject<StockHistory[]>;
  private readonly variantsMap = new Map<string, StockHistory>();
  constructor(private stockSvc: StockService,
              private database: PouchDBService,
              private model: MainModelService) {
    this.variantsSubject = new BehaviorSubject([]);
  }


  public loadAllStockHistory(variantIds: string[]): Observable<StockHistory[]> {
    const data: StockHistory[] = [];
    this.stockSvc.productStockHistory(variantIds).forEach(d => data.push(d as StockHistory));
    this.variantsSubject.next(this.database.unique(data, 'createdAt'));
    this.variantsMap.clear();
    data.forEach(variant => this.variantsMap.set(variant.id as any, variant));
    return of(data);
  }

  public host(id: string): StockHistory | undefined {
    return this.variantsMap.get(id);
  }
  findVariant(variantId: string) {
    return this.model.find<Variant>(Tables.variants, variantId);
  }
}
