import { Variant } from './variant'

export class Product {
  id: string
  name: string
  description?: string
  picture?: string
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
  branchId?: any
  businessId?: any
  supplierId?: any
  isManufactured?: boolean
  isBatchTracked?: boolean
  isStandardProduct?: boolean
  isProductWithVariants?: boolean
  isCompositeProduct?: boolean
  enableTrackingInventory?: boolean
  categoryId?: any
  brandId?: any
  taxId?: any
  active?: boolean
  hasPicture?: boolean
  isDraft?: boolean
  isOnPos?: boolean
  color?: string
  syncedOnline?: boolean
  isCurrentUpdate?: boolean
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
