export class OrderDetails {
  id?: string
  orderId: string
  variantId: string
  stockId: string
  sku?: string
  unit?: string
  variantName?: string
  productName?: string
  price?: any
  quantity: any
  subTotal?: any
  taxRate?: any
  taxAmount?: any
  discountRate?: any
  discountAmount?: any
  canTrackStock?: boolean
  note?: string
  createdAt: string
  updatedAt: string
  table: string
  channels: string[]

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name]
    }
  }
}
