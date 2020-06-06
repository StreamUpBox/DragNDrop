import { Injectable } from '@angular/core';
import { MainModelService, Tables, Stock, Branch, SettingsService, StockHistory, Variant } from '@enexus/flipper-components';
import { ModelService } from '@enexus/flipper-offline-database';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  reasons = [];
  constructor(private query: ModelService, private model: MainModelService, private setting: SettingsService) { }

  init() {
    this.reasons = this.setting.reasons();
  }
  findBranch(id: number): Branch {
    return this.model.find<Branch>(Tables.branch, id);
  }
  variantStocks(variantId: number): Stock[] {
    return this.model.filters<Stock>(Tables.stocks, 'variantId', variantId);
  }

  variantStockHistory(variantId: number): StockHistory[] {
    return this.model.filters<StockHistory>(Tables.stockHistory, 'variantId', variantId);
  }

  productStockHistory(variantIds: number[], reasons: string[]= []): StockHistory[] {
    const rs = reasons.length > 0 ? `reason IN (${reasons.join()}) AND` : '';
    return this.query.queries(Tables.stockHistory, ` ${rs} variantId IN (${variantIds.join()})`);
  }

  findStock(variantId: number) {
    return this.model.find<Stock>(Tables.stocks, variantId);
  }

  findVariant(variantId: number) {
    return this.model.find<Variant>(Tables.variants, variantId);
  }

  findPreviouslyStockHistory(variantId: number) {
    return this.query.select(Tables.stockHistory)
      .where('variantId', variantId)
      .andWhere('isPreviously', true).first<StockHistory>();
  }

  findDraftStockHistory(variantId: number) {
    return this.query.select(Tables.stockHistory)
      .where('variantId', variantId)
      .andWhere('isDraft', true).first<StockHistory>();
  }

  createStocks(variantId: number, branches: Branch[]): void {
    if (branches.length > 0) {
      branches.forEach(branch => {

        this.create({
          branchId: branch.id,
          variantId,
          reasonId: 0,
          currentStock: 0,
          supplyPrice: 0,
          retailPrice: 0,
          lowStock: 0,
          active: true,
          inStock: 0,
          syncedOnline: false,
          canTrackingStock: false,
          showLowStockAlert: false
        });
      });
    }
  }

  create(stock: Stock): any {
    return this.model.create<Stock>(Tables.stocks, stock);
  }

  createHistory(stock: StockHistory): any {
    return this.model.create<StockHistory>(Tables.stockHistory, stock);
  }
  updateHistory(stock: StockHistory): any {
    return this.model.update<StockHistory>(Tables.stockHistory, stock, stock.id);
  }


  update(stock: Stock): Stock {
    if (stock) {
      return this.model.update<Stock>(Tables.stocks, stock, stock.id);
    }

  }

  updateStockHistoryAction(variantId: number) {
    const draft = this.findDraftStockHistory(variantId);

    const stockVariant: StockHistory[] = this.variantStockHistory(variantId);
    if (stockVariant.length > 0) {
        stockVariant.forEach(vs => {
          vs.isPreviously = false;
          vs.isDraft = false;
          this.updateHistory(vs);
        });
      }

    if (draft) {
          draft.isDraft = false;
          draft.isPreviously = true;
          this.updateHistory(draft);
         }

  }

  deleteStocks(variation: Variant): void {
    const stocks: Stock[] = this.model.filters<Stock>(Tables.stocks, 'variantId', variation.id);

    if (stocks.length > 0) {
      stocks.forEach(stock => {
        this.model.delete(Tables.stocks, stock.id);
      });
    }
  }
  deleteStocksHistory(variation: Variant): void {
    const stocks: StockHistory[] = this.model.filters<StockHistory>(Tables.stockHistory, 'variantId', variation.id);
    if (stocks.length > 0) {
      stocks.forEach(stock => {
        this.model.delete(Tables.stocks, stock.id);
      });
    }
  }



}
