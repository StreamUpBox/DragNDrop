import { OrderDetails } from './order-details'
import { Branch } from './branch'

export class Order {
  id?: string
  branchId: string
  orderNumber: string
  status?: string
  reference?: string
  orderType?: string
  subTotal?: any
  taxRate?: any
  taxAmount?: any
  cashReceived?: any
  customerChangeDue?: any
  saleTotal?: any
  active?: boolean
  isDraft?: boolean
  orderItems: OrderDetails[]
  orderNote?: string
  createdAt: string
  updatedAt: string
  table: string
  channels: string[]
  constructor(params?: object)

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name]
    }
  }
}
