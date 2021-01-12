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

  date = new Date().toISOString()

  async ngOnInit() {
    await this.currentBusiness()
    await this.currentBranches()
    await this.newOrder()
    await this.hasDraftOrder()
    await this.variant.variations()
    await this.stock.allStocks()
    if (this.defaultBusiness$) {
      await this.product.loadAllProducts(this.defaultBusiness$.id)
    }

    if (this.currentOrder) {
      this.getOrderDetails()
    }

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
      await this.allOrderDetails(this.currentOrder.id)
      const orderDetails = this.getOrderDetails()

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

  public async productTax(taxId) {
    // comment

    return await this.database
      .query(['table', 'id'], {
        table: { $eq: 'taxes' },
        id: { $eq: taxId },
      })
      .then(res => {
        if (res.docs && res.docs.length > 0) {
          this.defaultTax$ = res.docs[0] as Taxes
        } else {
          this.defaultTax$ = null
        }
      })
  }

  public async allOrderDetails(orderId) {
    // comment
    console.log(orderId)
    await this.http
      .get<[OrderDetails]>(flipperUrl + '/api/orders/' + orderId)
      .toPromise()
      .then(orders => {
        if (orders.length > 0) {
          this.orderDetails = orders
        } else {
          this.orderDetails = []
        }
      })
    // return await this.database
    //   .query(['table', 'orderId'], {
    //     table: { $eq: 'orderDetails' },
    //     orderId: { $eq: orderId },
    //   })
    //   .then(res => {
    //     if (res.docs && res.docs.length > 0) {
    //       this.orderDetails = res.docs as OrderDetails[]
    //     } else {
    //       this.orderDetails = []
    //     }
    //   })
  }
  getOrderDetails() {
    const orderDetails: OrderDetails[] = []
    this.orderDetails.forEach(details => {
      let stock: Stock = null
      let variant: Variant = null
      let product: Product = null
      variant = this.variant.allVariants.find(variation => variation.id == details.variantId)
      if (variant) {
        stock = this.stock.stocks.find(variation => variation.variantId == variation.id)
      }

      if (variant) {
        product = this.product.products.find(prod => prod.id == variant.productId)
      }

      details.stock = stock
      details.variant = variant
      details.product = product

      orderDetails.unshift(details)
    })

    return orderDetails
  }

  public loadVariants(param = null) {
    let variantsArray: Variant[] = []

    if (this.variant.allVariants.length > 0) {
      this.variant.allVariants.forEach(variant => {
        const stock: Stock = this.stock.stocks.find(res => res.variantId == variant.id)

        if (stock) {
          const variation: Variant = variant

          variation.productName = variant.productName

          variation.stock = stock

          variation.name = variation.name === 'Regular' ? variation.productName + ' - Regular' : variation.name

          variation.priceVariant = {
            id: '0',
            priceId: 0,
            variantId: variation.id,
            minUnit: 0,
            maxUnit: 0,
            retailPrice: stock.retailPrice ? stock.retailPrice : 0.0,
            supplyPrice: stock.supplyPrice ? stock.supplyPrice : 0.0,
            wholeSalePrice: stock.wholeSalePrice ? stock.wholeSalePrice : 0.0,
            discount: 0,
            markup: 0,
            table: 'variants',
            channels: [variant.userId],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }

          if (stock.canTrackingStock === false) {
            variantsArray.push(variation)
          } else {
            if (stock.canTrackingStock === true && stock.currentStock > 0) {
              variantsArray.push(variation)
            }
          }
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
      // await this.database.remove(details.item)
      console.log('can remove', details.item)
    }

    if (details.action === 'UPDATE') {
      details.item.price = parseFloat(details.item.price)

      const taxRate = details.item.taxRate ? details.item.taxRate : 0
      const subTotal = details.item.price * details.item.quantity

      details.item.taxAmount = (subTotal * taxRate) / 100
      details.item.subTotal = subTotal

      console.log('can update the dociiii', details.item)
      // await this.database.put(PouchConfig.Tables.orderDetails + '_' + details.item.id, details.item)
    }

    // await this.allOrderDetails(this.currentOrder.id)
    // this.currentOrder.orderItems = this.getOrderDetails()
    // this.updateOrder()
  }

  public async updateOrder() {
    await this.allOrderDetails(this.currentOrder.id)
    this.getOrderDetails()

    const orderDetails = this.orderDetails.filter(order => order.orderId == this.currentOrder.id)
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

    await this.database.put(PouchConfig.Tables.orders + '_' + this.currentOrder.id, this.currentOrder)
    await this.hasDraftOrder()
  }

  public async addToCart(event: any) {
    // const variant: Variant = event.variant
    let taxRate = 0
    let product = null
    let tax = null
    // if (variant.productId) {
    //   product = this.product.products.find(prod => prod.id == variant.productId)

    //   if (product) {
    //     await this.productTax(product.taxId)
    //     tax = this.defaultTax$ ? this.defaultTax$.percentage : 0
    //   } else {
    //     tax = 0
    //   }
    // } else {
    //   tax = event.tax ? event.tax : 0
    // }

    taxRate = event.tax ? event.tax : tax ? tax : 0

    // const orderDetails: OrderDetails = {
    //   price: variant.priceVariant.retailPrice,
    //   variantName: variant.name,
    //   productName: variant.productName,
    //   canTrackStock: variant.canTrackingStock,
    //   stockId: variant.stock.id,
    //   unit: variant.unit,
    //   sku: variant.sku,
    //   quantity: event.quantity,
    //   variantId: variant.id,
    //   taxRate,
    // FIXME: the taxable amount might be wrong
    // taxAmount: (variant.priceVariant.retailPrice * event.quantity * taxRate) / 100,
    // orderId: this.currentOrder.id,
    // subTotal: variant.priceVariant.retailPrice * event.quantity,
    // table: 'orderDetails',
    // createdAt: this.date,
    // updatedAt: this.date,
    // channels: [this.defaultBusiness$.userId],
    //}

    console.log(event)

    // await this.http
    //   .post(flipperUrl + '/api/order-detail', orderDetails)
    //   .toPromise()
    //   .then(orders => {
    // console.log('orders',orders);
    //  })
    // this.database.put(PouchConfig.Tables.orderDetails + '_' + orderDetails.id, orderDetails)
    // await this.allOrderDetails(this.currentOrder.id)
    // this.currentOrder.orderItems = this.getOrderDetails()
    // this.updateOrder()
  }

  async didCollectCash(event) {
    this.collectCashCompleted = { isCompleted: false, collectedOrder: this.currentOrder }
    if (event === true) {
      await this.allOrderDetails(this.currentOrder.id)
      await this.createStockHistory()
      this.currentOrder.isDraft = false
      this.currentOrder.active = false
      this.currentOrder.status = STATUS.COMPLETE
      this.currentOrder.createdAt = new Date().toISOString()
      this.currentOrder.updatedAt = new Date().toISOString()
      // this.currentOrder.customerChangeDue = this.currentOrder.customerChangeDue

      await this.database.put(PouchConfig.Tables.orders + '_' + this.currentOrder.id, this.currentOrder)

      this.collectCashCompleted = { isCompleted: true, collectedOrder: this.currentOrder }
      this.currentOrder = null
    }
  }

  async createStockHistory() {
    const orderDetails = this.getOrderDetails()

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
