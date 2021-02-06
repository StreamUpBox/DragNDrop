import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  Stock,
  Branch,
  SettingsService,
  StockHistory,
  Variant,
  PouchDBService,
  PouchConfig,
} from '@enexus/flipper-components'
import { flipperUrl } from '../constants'

@Injectable({
  providedIn: 'root',
})
export class StockService {
  reasons = []
  branches$: Branch[] = []
  branch$: Branch = null
  stock: Stock = null
  stocks: Stock[] = []
  variant: Variant
  stockHistory: StockHistory
  stockHistories: StockHistory[]

  constructor(private http: HttpClient, private setting: SettingsService, private database: PouchDBService) {}

  async init() {
    await this.currentBranches()
    this.reasons = this.setting.reasons()
  }

  currentBranches() {
    return this.database.listBusinessBranches().then(branches => {
      this.branches$ = branches
    })
  }

  allStocks() {
    return this.database
      .query(['table'], {
        table: { $eq: 'stocks' },
      })
      .then(res => {
        if (res.docs && res.docs.length > 0) {
          this.stocks = res.docs as Stock[]
        } else {
          this.stocks = []
        }
      })
  }
  findVariantStock(variantId: any) {
    return this.database
      .query(['table', 'variantId'], {
        table: { $eq: 'stocks' },
        variantId: { $eq: variantId },
      })
      .then(res => {
        if (res.docs && res.docs.length > 0) {
          this.stock = res.docs[0] as Stock
        } else {
          this.stock = null
        }
      })
  }

  findVariantStocks(variantId: any) {
    return this.database
      .query(['table', 'variantId'], {
        table: { $eq: 'stocks' },
        variantId: { $eq: variantId },
      })
      .then(res => {
        if (res.docs && res.docs.length > 0) {
          this.stocks = res.docs
        } else {
          this.stocks = []
        }
      })
  }

  variantStocks(variantId: string) {
    return this.database.callbackQuery(['table', 'variantId'], { table: 'stocks', variantId: variantId }, res => {
      if (res.docs && res.docs.length > 0) {
        return res.docs
      } else {
        return []
      }
    })
  }
  variantStocksV2(variantId: string) {
    return this.database.fastQuery(['table', 'variantId'], { table: 'stocks', variantId: variantId })
  }

  variantStocks1(variantId: string): Stock[] {
    return this.database.callbackQuery(['table', 'variantId'], { table: 'stocks', variantId: variantId }, res => {
      if (res.docs && res.docs.length > 0) {
        return res.docs
      } else {
        return []
      }
    })
  }

  async variantStockHistory(variantId: string): Promise<StockHistory[]> {
    return await this.http
      .get<[StockHistory]>(flipperUrl + '/api/stockHistories/' + variantId)
      .toPromise()
      .then(histories => {
        return (this.stockHistories = histories)
      })
    // return this.database
    //   .query(['table', 'variantId'], {
    //     table: { $eq: 'stockHistories' },
    //     variantId: { $eq: variantId },
    //   })
    //   .then(res => {
    //     if (res.docs && res.docs.length > 0) {
    //       this.stockHistories = res.docs as StockHistory[]
    //     } else {
    //       this.stockHistories = [] as StockHistory[]
    //     }
    //   })
  }

  productStockHistory(variantIds: string[], reasons: string[] = []) {
    const rs = reasons.length > 0 ? `reason IN (${reasons.join()}) AND` : ''
    return []
  }

  findStock(Id: string) {
    return this.database
      .query(['table', 'id'], {
        table: { $eq: 'stocks' },
        id: { $eq: Id },
      })
      .then(res => {
        if (res.docs && res.docs.length > 0) {
          this.stock = res.docs[0] as Stock
        } else {
          this.stock = null
        }
      })
  }

  findBranch(branchId) {
    return this.database
      .query(['table', 'branchId'], {
        table: { $eq: 'branches' },
        id: { $eq: branchId },
      })
      .then(res => {
        if (res.docs && res.docs.length > 0) {
          this.branch$ = res.docs[0] as Branch
        } else {
          this.branch$ = null
        }
      })
  }

  findVariant(variantId: string) {
    return this.database
      .query(['table', 'variantId'], {
        table: { $eq: 'variants' },
        id: { $eq: variantId },
      })
      .then(res => {
        if (res.docs && res.docs.length > 0) {
          this.variant = res.docs[0] as Variant
        } else {
          this.variant = null
        }
      })
  }

  findPreviouslyStockHistory(variantId: string) {
    return this.database
      .query(['table', 'variantId', 'isPreviously'], {
        table: { $eq: 'stockHistories' },
        variantId: { $eq: variantId },
        isPreviously: { $eq: true },
      })
      .then(res => {
        if (res.docs && res.docs.length > 0) {
          this.stockHistory = res.docs[0] as StockHistory
        } else {
          this.stockHistory = null
        }
      })
  }

  findDraftStockHistory(variantId: string) {
    return this.database
      .query(['table', 'variantId', 'isDraft'], {
        table: { $eq: 'stockHistories' },
        variantId: { $eq: variantId },
        isDraft: { $eq: true },
      })
      .then(res => {
        if (res.docs && res.docs.length > 0) {
          this.stockHistory = res.docs[0] as StockHistory
        } else {
          this.stockHistory = null
        }
      })
  }

  async createStocks(formData: any, branches = []) {
    if (branches.length > 0) {
      this.branches$ = branches
    } else {
      await this.currentBranches()
    }

    if (this.branches$.length > 0) {
      this.branches$.forEach(branch => {
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
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          table: 'stocks',
          channels: [localStorage.getItem('userIdNew')],
        })
      })
    }
    return true
  }

  async create(stock: Stock) {
    await this.http
      .put(flipperUrl + '/api/stock/' + stock.id, stock)
      .toPromise()
      .then()
    // return this.database.put(stock.id, stock)
  }

  createHistory(stock: StockHistory): any {
    return this.database.put(stock.id, stock)
  }
  updateHistory(stock: StockHistory): any {
    return this.database.put(stock.id, stock)
  }

  async update(stock: Stock): Promise<Stock> {
    if (stock) {
      // return this.database.put(stock.id, stock)
      return await this.http
        .put<Stock>(flipperUrl + '/api/stock/' + stock.id, stock)
        .toPromise()
        .then(updatatedStock => {
          return updatatedStock
        })
    }
  }

  updateStockHistoryAction(variantId: string) {
    const draft = this.findDraftStockHistory(variantId)

    this.variantStockHistory(variantId).then(stockVariant => {
      if (stockVariant.length > 0) {
        stockVariant.forEach(vs => {
          this.updateHistory(vs)
        })
      }
    })

    if (draft) {
      draft.isDraft = false
      draft.isPreviously = true
      this.updateHistory(draft)
    }
  }

  async deleteStocks(variation: Variant) {
    await this.findVariantStocks(variation.id)

    if (this.stocks.length > 0) {
      this.stocks.forEach(stock => {
        this.database.remove(stock)
      })
    }
  }

  async deleteStocksHistory(variation: Variant) {
    await this.variantStockHistory(variation.id)

    if (this.stockHistories.length > 0) {
      this.stockHistories.forEach(stock => {
        this.database.remove(stock)
      })
    }
  }
}
