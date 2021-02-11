import { transition, trigger, useAnimation } from '@angular/animations'
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { APIService } from '@enexus/api-services'
import {
  CalculateTotalClassPipe,
  Order,
  STATUS,
  ORDERTYPE,
  Branch,
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

  get taxes(): Taxes[] {
    return this.setTaxes
  }

  set taxes(value: Taxes[]) {
    this.setTaxes = value
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
    private api: APIService,
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
  private setTaxes: Taxes[]

  date = new Date().toISOString()

  async ngOnInit() {
    await this.getTaxes()
    await this.currentBusiness()
    await this.currentBranches()
    await this.newOrder()
    await this.hasDraftOrder()

    await this.stockVariants()
    this.currentOrder.orderItems =
      (this.currentOrder) && this.currentOrder.orderItems && this.currentOrder.orderItems.length > 0
        ? this.currentOrder.orderItems
        : []
    this.updateOrder([])

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

  public async getTaxes() {
    await this.http
      .get<Taxes[]>(flipperUrl + '/api/taxes')
      .toPromise()
      .then(taxes => {
        this.taxes = taxes
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
    console.log("got option to create order")
    if (!this.currentOrder) {
      const formOrder = {
        reference: 'SO' + this.generateCode(),
        orderNumber: 'SO' + this.generateCode(),
        branchId: this.defaultBranch.id,
        status: STATUS.OPEN,
        orderType: ORDERTYPE.SALES,
        active: true,
        orderItems: [],
        subTotal: 0.0,
        draft: true,
        cashReceived: 0.0,
        customerChangeDue: 0.0,
        table: 'orders',
        channels: [this.defaultBusiness$.userId],
        createdAt: this.date,
        updatedAt: this.date,
      }

      // create a draft order to be used. if it does not exist
      await this.http
        .post(flipperUrl + '/api/order', formOrder)
        .toPromise()
        .then(order => {
          this.currentOrder = order as Order
        })
    }
  }

  async hasDraftOrder() {
    await this.draftOrder(this.defaultBranch)
  }
  public async draftOrder(branchId) {
    await this.http
      .get(flipperUrl + '/api/draft-order')
      .toPromise()
      .then(async res => {
        this.currentOrder = res as Order
        this.currentOrder.orderItems =
          (this.currentOrder) && this.currentOrder.orderItems && this.currentOrder.orderItems.length > 0
            ? this.currentOrder.orderItems
            : []
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

  public async loadVariants(key = null) {
    let variantsArray: any[] = await this.api.searchQuery(key);
    return variantsArray
  }

  public async iWantToSearchVariant(event) {

    if (event && event != undefined && event != null) {
      let results = await this.loadVariants(event)

      if (results.length > 0) {
        this.theVariantFiltered = this.filterByValue(results, event)
      }
    }
  }

  filterByValue(arrayOfObject: any[], term: any) {
    const query = term.toString().toLowerCase()
    return arrayOfObject.filter((v:Variant, i) => {
      if (
        v.name.toString().toLowerCase().indexOf(query) == 0 ||
        v.sku.toString().toLowerCase().includes(query)  ==true ||
        v.unit.toString().toLowerCase().includes(query) ==true ||
        v.unit.toString().toLowerCase().includes(query) ==true ||
        v.productName.toString().toLowerCase().indexOf(query) == 0
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
      details.item.retailPrice = parseFloat(details.item.retailPrice)

      const taxRate = details.item.taxRate ? details.item.taxRate : 0
      const subTotal = details.item.retailPrice * details.item.quantity

      details.item.taxAmount = (subTotal * taxRate) / 100
      details.item.subTotal = subTotal

      this.currentOrder.orderItems = this.currentOrder.orderItems.filter(el => {
        return el.id != details.item.id
      })

      this.currentOrder.orderItems.push(details.item)
    }
    const orderDetails: OrderDetails[] = this.currentOrder.orderItems

    this.updateOrder(orderDetails)
  }

  public async updateOrder(orderDetail) {
    let orderDetails = []
    if (orderDetail.length == 0) {
      orderDetails = this.currentOrder.orderItems.filter(order => order.orderId == this.currentOrder.id)
    } else {
      orderDetails = orderDetail
    }
    if (orderDetails.length > 0) {
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
  }

  public async addToCart(event: OrderDetails) {
    event.id = this.database.uid()
    event.orderId = this.currentOrder.id

    const taxRate = event.taxRate ? event.taxRate : 0
    const subTotal = event.retailPrice * event.quantity

    event.taxAmount = (subTotal * taxRate) / 100
    event.subTotal = subTotal

    this.currentOrder.orderItems.push(event)
    const orderDetails: OrderDetails[] = this.currentOrder.orderItems
    if (orderDetails.length > 0) {
      await this.updateOrder(orderDetails)
    }
  }

  async didCollectCash(event) {
    this.collectCashCompleted = { isCompleted: false, collectedOrder: this.currentOrder }
    if (event === true) {
      await this.createStockHistory()
      this.currentOrder.isDraft = false
      this.currentOrder.status = STATUS.COMPLETE
      this.currentOrder.createdAt = new Date().toISOString()
      this.currentOrder.updatedAt = new Date().toISOString()
      this.currentOrder.active = false
      this.currentOrder['draft'] = false
      await this.http
        .put(flipperUrl + '/api/order/' + this.currentOrder.id, this.currentOrder)
        .toPromise()
        .then(async order => {
          this.collectCashCompleted =  { isCompleted: true, collectedOrder: order }
          this.currentOrder = null
          await this.newOrder()
          await this.hasDraftOrder()
        })
    }
  }

  async createStockHistory() {
    const odetails = this.currentOrder.orderItems as any[]
    if (odetails.length>0) {
      odetails.forEach(async details => {
          const stockHistories: StockHistory = {
            id: this.database.uid(),
            orderId: details.orderId,
            variantId: details.variantId,
            variantName: details.variantName,
            stockId: details.id,
            reason: 'Sold',
            quantity: details.quantity,
            isDraft: false,
            note: 'Customer sales',
            table: 'stockHistories',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            channels: [this.defaultBusiness$.userId],
          }
          await this.http
            .post<StockHistory>(flipperUrl + '/api/stock-histories', stockHistories)
            .toPromise()
            .then()

      })
    }
  }

  async saveOrderUpdated(event: any) {
    await this.updateOrder([])
  }
}
