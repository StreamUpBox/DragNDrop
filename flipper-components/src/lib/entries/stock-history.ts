export class StockHistory {
  id: string
  orderId: string
  variantId?: string
  variantName: string
  productName: string
  productId?: string
  stockId: any
  reason?: string
  quantity: any
  isDraft?: boolean
  isPreviously?: boolean
  syncedOnline?: boolean
  note?: string
  createdAt: string
  updatedAt: string
  table: string
  cashReceived:number
  cashCollected: number
  saleTotal: number
  customerChangeDue: number
  channels: Array<string>
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name]
    }
  }
}
