export class PriceVariant {
  id: string
  priceId?: any
  variantId?: any
  minUnit?: any
  maxUnit?: any
  retailPrice?: any
  supplyPrice?: any
  wholeSalePrice?: any
  discount?: any
  markup?: any
  syncedOnline?: boolean
  createdAt: string
  updatedAt: string
  table: string
  docId?: string
  channels: Array<string>

  channel?: string

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name]
    }
  }
}
