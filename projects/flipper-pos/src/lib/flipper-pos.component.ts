import { transition, trigger, useAnimation } from '@angular/animations'
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import {
  CalculateTotalClassPipe,
  Order,
  STATUS,
  ORDERTYPE,
  Branch,
  Stock,
  Product,
  OrderDetails,
  StockHistory,
  Business,
  Taxes,
  PouchDBService,
  PouchConfig,
  Variant,
  fadeInAnimation,
} from '@enexus/flipper-components'

import { ProductService, StockService, VariationService } from '@enexus/flipper-inventory'
import { flipperUrl } from './constants'

@Component({
  selector: 'lib-flipper-pos',
  templateUrl: './flipper.pos.component.html',
  styleUrls: ['./flipper.pos.component.css'],
  animations: [
    trigger('insertPos', [transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))]),
  ],
})
export class FlipperPosComponent implements OnInit {
  get theVariantFiltered(): Variant[] {
    return this.seTheVariantFiltered
  }

  set theVariantFiltered(value: Variant[]) {
    this.seTheVariantFiltered = value
  }

  get currentOrder(): Order {
    return this.setCurrentOrder
  }

  set currentOrder(value: Order) {
    this.setCurrentOrder = value
  }

  get stockVariant(): any[] {
    return this.setStockVariant
  }

  set stockVariant(value: any[]) {
    this.setStockVariant = value
  }

  public branch: Branch | null
  public defaultBusiness$: Business = null
  public defaultBranch: Branch = null
  public defaultTax$: Taxes = null
  public orderDetails: OrderDetails[] = []

  public currency = null
  constructor(
    private database: PouchDBService,
    private stock: StockService,
    private http: HttpClient,
    public variant: VariationService,
    public product: ProductService,
    private totalPipe: CalculateTotalClassPipe
  ) {
    this.database.connect(PouchConfig.bucket, localStorage.getItem('channel'))

    this.database.sync([PouchConfig.syncUrl])
  }

  public variants: Variant[] = []
  private seTheVariantFiltered: Variant[] = []
  public collectCashCompleted: object = {}

  private setCurrentOrder: Order
  private setStockVariant: any[]

  date = new Date().toISOString()

  async ngOnInit() {
    await this.currentBusiness()
    await this.currentBranches()
    await this.newOrder()
    await this.hasDraftOrder()
    await this.stockVariants()
    this.updateOrder()

    this.currency = this.defaultBusiness$ ? this.defaultBusiness$.currency : 'RWF'
  }

  public async currentBusiness() {
    await this.http
      .get<Business>(flipperUrl + '/api/business')
      .toPromise()
      .then(business => {
        this.defaultBusiness$ = business
      })
  }

  async currentBranches() {
    await this.http
      .get<[Branch]>(flipperUrl + '/api/branches/' + this.defaultBusiness$.id)
      .toPromise()
      .then(branches => {
        for (let branch of branches) {
          if (branch.active) {
            this.defaultBranch = branch
          }
        }
      })
  }

  makeid(length: number) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  generateCode(): string {
    return this.makeid(5)
  }

  public async newOrder() {
    if (!this.currentOrder) {
      const formOrder: Order = {
        reference: 'SO' + this.generateCode(),
        orderNumber: 'SO' + this.generateCode(),
        branchId: this.defaultBranch.id,
        status: STATUS.OPEN,
        orderType: ORDERTYPE.SALES,
        active: true,
        orderItems: [],
        isDraft: true,
        subTotal: 0.0,
        cashReceived: 0.0,
        customerChangeDue: 0.0,
        table: 'orders',
        channels: [this.defaultBusiness$.userId],
        createdAt: this.date,
        updatedAt: this.date,
      }

      // create a draft order to be used.
      await this.http
        .post(flipperUrl + '/api/order', formOrder)
        .toPromise()
        .then()

      this.hasDraftOrder()
    }
  }

  async hasDraftOrder() {
    await this.draftOrder(this.defaultBranch)
    if (this.currentOrder) {
      const orderDetails = [] //this.getOrderDetails()
      this.currentOrder.orderItems = orderDetails && orderDetails.length > 0 ? orderDetails : []
    }
  }
  public async draftOrder(branchId) {
    //pass empty body to get a draft oder.
    await this.http
      .post(flipperUrl + '/api/order', {})
      .toPromise()
      .then(res => {
        this.currentOrder = res as Order
      })
  }

  public async stockVariants() {
    await this.http
      .get<[any]>(flipperUrl + '/api/stock-variant')
      .toPromise()
      .then(orders => {
        if (orders.length > 0) {
          this.stockVariant = orders
        } else {
          this.stockVariant = []
        }
      })
  }

  public loadVariants(param = null) {
    let variantsArray: any[] = []

    if (this.stockVariant.length > 0) {
      this.stockVariant.forEach(variant => {
        const form = {
          id: variant.id,
          retailPrice: variant.retailPrice,
          sku: variant.sku ? variant.sku : '00',
          name: variant.name ? variant.name : 'no item',
          productName: variant.productName ? variant.productName : 'no item',
          taxName: null,
          taxId: null,
          unit: null,
          currentStock: variant.value,
          canTrackingStock: variant.canTrackingStock,
        }
        if (form.currentStock > 0) {
          // Todo: niba stock irimo koko this should be true if(form.canTrackingStock && form.currentStock > 0){
          variantsArray.push(form)
        }
      })
    }
    return variantsArray
  }

  public iWantToSearchVariant(event) {
    if (event && event != undefined && event != null) {
      const results = this.loadVariants(event)
      if (results.length > 0) {
        this.theVariantFiltered = this.filterByValue(results, event)
      }
    }
  }

  filterByValue(arrayOfObject: Variant[], term: any) {
    const query = term.toString().toLowerCase()
    return arrayOfObject.filter((v, i) => {
      if (
        v.name.toString().toLowerCase().indexOf(query) >= 0 ||
        v.sku?.toString().toLowerCase().includes(query) > 0 ||
        v.productName?.toString().toLowerCase().indexOf(query) >= 0
      ) {
        return true
      } else {
        return false
      }
    })
  }

  async updateOrderDetails(details: { action: string; item: OrderDetails }) {
    if (details.action === 'DELETE') {
      this.currentOrder.orderItems = this.currentOrder.orderItems.filter(el => {
        return el.id != details.item.id
      })
    }

    if (details.action === 'UPDATE') {
      details.item.price = parseFloat(details.item.price)

      const taxRate = details.item.taxRate ? details.item.taxRate : 0
      const subTotal = details.item.price * details.item.quantity

      details.item.taxAmount = (subTotal * taxRate) / 100
      details.item.subTotal = subTotal

      this.currentOrder.orderItems = this.currentOrder.orderItems.filter(el => {
        return el.id != details.item.id
      })
      this.currentOrder.orderItems.push(details.item)
    }

    this.updateOrder()
  }

  public async updateOrder() {
    const orderDetails = this.currentOrder.orderItems.filter(order => order.orderId == this.currentOrder.id)
    const subtotal = parseFloat(this.totalPipe.transform<OrderDetails>(orderDetails, 'subTotal'))
    const taxAmount = parseFloat(this.totalPipe.transform<OrderDetails>(orderDetails, 'taxAmount'))
    this.currentOrder.subTotal = subtotal

    this.currentOrder.taxAmount = taxAmount
    this.currentOrder.saleTotal = subtotal + taxAmount

    this.currentOrder.customerChangeDue =
      this.currentOrder.cashReceived > 0
        ? parseFloat(this.currentOrder.cashReceived) - this.currentOrder.saleTotal
        : 0.0
    this.currentOrder.customerChangeDue = parseFloat(this.currentOrder.customerChangeDue)

    this.currentOrder = this.currentOrder
  }

  public async addToCart(event: any) {
    event.id = this.database.uid()
    event.orderId = this.currentOrder.id
    this.updateOrder()
    this.currentOrder.orderItems.push(event)
  }

  async didCollectCash(event) {
    this.collectCashCompleted = { isCompleted: false, collectedOrder: this.currentOrder }
    if (event === true) {
      await this.createStockHistory()
      this.currentOrder.isDraft = false
      this.currentOrder.active = false
      this.currentOrder.status = STATUS.COMPLETE
      this.currentOrder.createdAt = new Date().toISOString()
      this.currentOrder.updatedAt = new Date().toISOString()

      await this.database.put(PouchConfig.Tables.orders + '_' + this.currentOrder.id, this.currentOrder)

      this.collectCashCompleted = { isCompleted: true, collectedOrder: this.currentOrder }
      this.currentOrder = null
    }
  }

  async createStockHistory() {
    const orderDetails = [] //this.getOrderDetails()

    if (orderDetails.length) {
      orderDetails.forEach(details => {
        if (
          details.stockId != null ||
          details.stockId != undefined ||
          (details.stock && details.stock.canTrackingStock)
        ) {
          const stockHistories: StockHistory = {
            id: this.database.uid(),
            orderId: details.orderId,
            variantId: details.variantId,
            variantName: details.variantName,
            stockId: details.stockId,
            reason: 'Sold',
            quantity: details.quantity,
            isDraft: false,
            isPreviously: false,
            syncedOnline: false,
            note: 'Customer sales',
            table: 'stockHistories',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            channels: [this.defaultBusiness$.userId],
          }
          this.database.put(PouchConfig.Tables.stockHistories + '_' + stockHistories.id, stockHistories)

          this.updateStock(details)
        }
      })
    }
  }

  updateStock(stockDetails: OrderDetails) {
    let stockId = ''
    if (stockDetails.stockId && (stockDetails.stockId !== null || stockDetails.stockId !== undefined)) {
      stockId = stockDetails.stockId
    } else if (stockDetails.stock && stockDetails.stock.id) {
      stockId = stockDetails.stock.id
    } else {
      stockId = ''
    }

    const stock: Stock = this.stock.stocks.find(s => s.id == stockId)
    if (stock) {
      stock.currentStock = stock.currentStock - stockDetails.quantity

      this.database.put(PouchConfig.Tables.stocks + '_' + stock.id, stock)
    }
  }

  async saveOrderUpdated(event: Order) {
    await this.database.put(PouchConfig.Tables.orders + '_' + event.id, event)
    await this.hasDraftOrder()
  }
}
