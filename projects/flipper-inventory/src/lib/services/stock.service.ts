import { Injectable } from '@angular/core';
import { MainModelService, Tables, Stock, Branch, SettingsService,
   StockHistory, Variant, PouchDBService, PouchConfig } from '@enexus/flipper-components';
import { ModelService } from '@enexus/flipper-offline-database';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  reasons = [];
  branches$: Branch[] = [];
  branch$: Branch = null;
  stock:Stock=null;
  stocks:Stock[]=[];
  variant: Variant;
  stockHistory: StockHistory;
  stockHistories: StockHistory[];
  constructor(private query: ModelService,
              private model: MainModelService,
              private setting: SettingsService,
              private database: PouchDBService) { }

  async init() {
    await this.currentBranches();
    this.reasons = this.setting.reasons();
  }

  currentBranches(){
    return this.database.listBusinessBranches().then(branches=>{
            this.branches$=branches;
       });
 }
 
  findVariantStock(variantId: any) {

    return this.database.query(['table','variantId'], {
      table: { $eq: 'stocks' },
      variantId: { $eq: variantId }
    }).then(res => {

      if (res.docs && res.docs.length > 0) {
          this.stock = res.docs[0] as Stock;
      } else {
        this.stock = null;
      }
  });

 

  }

 
  variantStocks(variantId: string): Stock[] {

        return this.database.callbackQuery(['table','variantId'],
        {table:'stocks',variantId:variantId},(res) =>{
          if (res.docs && res.docs.length > 0) {
              return res.docs;
          } else {
              return [];
          }
      })
  }



  variantStocks1(variantId: string): Stock[] {

    return this.database.callbackQuery(['table','variantId'],
    {table:'stocks',variantId:variantId},(res) =>{
      if (res.docs && res.docs.length > 0) {
          return res.docs;
      } else {
          return [];
      }
  })
}



  variantStockHistory(variantId: string): StockHistory[] {
   
      return this.database.query(['table','variantId'], {
        table: { $eq: 'stockHistories' },
        variantId: { $eq: variantId }
      }).then(res => {
        if (res.docs && res.docs.length > 0) {
          this.stockHistories= res.docs as StockHistory[];
        } else {
          this.stockHistories= [] as StockHistory[];
        }
    });
  }

  productStockHistory(variantIds: string[], reasons: string[]= []) {
    const rs = reasons.length > 0 ? `reason IN (${reasons.join()}) AND` : '';
    return [];
  }

  findStock(Id: string) {

        return this.database.query(['table','id'], {
          table: { $eq: 'stocks' },
          id: { $eq: Id }
        }).then(res => {

          if (res.docs && res.docs.length > 0) {
            this.stock = res.docs[0] as Stock;
          } else {
            this.stock = null;
          }
      });
  }

  findBranch(branchId){
    return this.database.query(['table','branchId'], {
      table: { $eq: 'branches' },
      id: { $eq: branchId }
    }).then(res => {

      if (res.docs && res.docs.length > 0) {
          this.branch$= res.docs[0] as Branch;
      } else {
          this.branch$= null;
      }
  });
  }


  findVariant(variantId: string) {

    return this.database.query(['table','variantId'], {
      table: { $eq: 'variants' },
      id: { $eq: variantId }
    }).then(res => {

      if (res.docs && res.docs.length > 0) {
        this.variant = res.docs[0] as Variant;
      } else {
        this.variant= null;
      }
  });

  }

  findPreviouslyStockHistory(variantId: string) {
    return this.database.query(['table','variantId','isPreviously'], {
        table: { $eq: 'stockHistories' },
        variantId: { $eq: variantId },
        isPreviously:{$eq:true}
      }).then(res => {
        if (res.docs && res.docs.length > 0) {
          this.stockHistory= res.docs[0] as StockHistory;
        } else {
          this.stockHistory= null;
        }
    });
  }

  findDraftStockHistory(variantId: string) {
  
      return this.database.query(['table','variantId','isDraft'], {
        table: { $eq: 'stockHistories' },
        variantId: { $eq: variantId },
        isDraft:{$eq:true}
      }).then(res => {
        if (res.docs && res.docs.length > 0) {
          this.stockHistory= res.docs[0] as StockHistory;
        } else {
          this.stockHistory= null;
        }
    });

  }

  async createStocks(formData:any,branches=[]) {
    if(branches.length > 0){
      this.branches$=branches;
    }else{
      await this.currentBranches();
    }
   
    if (this.branches$.length > 0) {
          this.branches$.forEach(branch => {
   
         this.create({
          id: this.database.uid(),
          branchId: branch.id,
          productId: formData.productId,
          variantId:formData.id,
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
          updatedAt: new Date(),
          table:'stocks',
        });
        
      });
    }
    return true;
  }

   create(stock: Stock) {
    return  this.database.put(PouchConfig.Tables.stocks+'_'+stock.id, stock);
  }

  createHistory(stock: StockHistory): any {
    return  this.database.put(PouchConfig.Tables.stockHistories+'_'+stock.id, stock);
  }
  updateHistory(stock: StockHistory): any {
    return  this.database.put(PouchConfig.Tables.stockHistories+'_'+stock.id, stock);
  }


  update(stock: Stock): Stock {
    if (stock) {
      return this.database.put(PouchConfig.Tables.stocks+'_'+stock.id, stock);
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
    const stocks: Stock[] = this.variantStocks(variation.id);

    if (stocks.length > 0) {
      stocks.forEach(stock => {
        this.database.remove(stock);;
      });
    }
  }

  deleteStocksHistory(variation: Variant): void {
    const stocks: StockHistory[] = this.variantStockHistory(variation.id);
    if (stocks.length > 0) {
      stocks.forEach(stock => {
        this.database.remove(stock);
      });
    }
  }



}
