export class Business {
  id: string
  name: string
  active: boolean
  categoryId: string
  currency: string
  country?: string
  businessUrl?: string
  timeZone?: string
  syncedOnline?: boolean
  userId?: string
  typeId?: any
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
