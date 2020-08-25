import { Injectable } from '@angular/core';
import { MainModelService, Tables, Stock, Branch, SettingsService,
   StockHistory, Variant, PouchDBService } from '@enexus/flipper-components';
import { ModelService } from '@enexus/flipper-offline-database';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  reasons = [];
  constructor(private query: ModelService,
              private model: MainModelService,
              private setting: SettingsService,
              private database: PouchDBService) { }

  init() {
    this.reasons = this.setting.reasons();
  }
  findVariantStock(variantId: any) {
    return this.model.findByFirst<Stock>(Tables.stocks, 'variantId', variantId);
  }

  findBranch(id: string): Branch {
    return this.model.find<Branch>(Tables.branch, id);
  }
  variantStocks(variantId: string): Stock[] {
    return this.model.filters<Stock>(Tables.stocks, 'variantId', variantId);
  }

  variantStockHistory(variantId: string): StockHistory[] {
    return this.model.filters<StockHistory>(Tables.stockHistory, 'variantId', variantId);
  }

  productStockHistory(variantIds: string[], reasons: string[]= []): StockHistory[] {
    const rs = reasons.length > 0 ? `reason IN (${reasons.join()}) AND` : '';
    return this.query.queries(Tables.stockHistory, ` ${rs} variantId IN (${variantIds.join()})`);
  }

  findStock(variantId: string) {
    return this.model.find<Stock>(Tables.stocks, variantId);
  }

  findVariant(variantId: string) {
    return this.model.find<Variant>(Tables.variants, variantId);
  }

  findPreviouslyStockHistory(variantId: string) {
    return this.query.select(Tables.stockHistory)
      .where('variantId', variantId)
      .andWhere('isPreviously', true).first<StockHistory>();
  }

  findDraftStockHistory(variantId: string) {
    return this.query.select(Tables.stockHistory)
      .where('variantId', variantId)
      .andWhere('isDraft', true).first<StockHistory>();
  }

  createStocks(formData: any , branches: Branch[]): void {
    if (branches.length > 0) {
      branches.forEach(branch => {

        this.create({
          id: this.database.uid(),
          branchId: branch.id,
          productId: formData.productId,
          variantId: formData.id,
          reasonId: 0,
          currentStock: 0,
          supplyPrice: formData.supplyPrice,
          retailPrice: formData.retailPrice,
          lowStock: 0,
          active: true,
          inStock: 0,
          canTrackingStock: false,
          showLowStockAlert: false,
          createdAt: new Date(),
          updatedAt: new Date()
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

  updateStockHistoryAction(variantId: string) {
    const draft = this.findDraftStockHistory(variantId);

    const stockVariant: StockHistory[] = this.variantStockHistory(variantId);
    if (stockVariant.length > 0) {
        stockVariant.forEach(vs => {

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
        this.model.delete(Tables.stocks, '"' + stock.id + '"');
      });
    }
  }

  deleteStocksHistory(variation: Variant): void {
    const stocks: StockHistory[] = this.model.filters<StockHistory>(Tables.stockHistory, 'variantId', variation.id);
    if (stocks.length > 0) {
      stocks.forEach(stock => {
        this.model.delete(Tables.stocks, '"' + stock.id + '"');
      });
    }
  }



}
