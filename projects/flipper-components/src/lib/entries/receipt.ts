export class Receipt {
  id: string
  businessName?: string
  branchId?: any
  digitalLogo?: string
  printedLogo?: string
  showLocation?: string
  color?: string
  address1?: string
  address2?: string
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
  showItemNote?: boolean
  city?: string
  customerText?: string
  returnPolicy?: string
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
