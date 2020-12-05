import { PriceVariant } from './price-variant'
import { Stock } from './stocks'
import { Product } from './product'

export class Variant {
  id: string
  SKU: any
  name: string
  productName?: string
  categoryName?: string
  brandName?: string
  productId?: any
  supplyPrice?: any
  retailPrice?: any
  wholeSalePrice?: any
  unit?: string
  isActive?: boolean
  priceVariant?: PriceVariant
  stock?: Stock
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
  product?: Product
  markup?: any
  syncedOnline?: boolean
  createdAt: string
  updatedAt: string
  table: string
  docId?: string
  channels: Array<string>

  channel?: string
  userId?: string

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name]
    }
  }
}
