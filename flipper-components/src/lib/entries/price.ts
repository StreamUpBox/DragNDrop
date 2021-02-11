export class Price {
  id: string
  name: string
  branchId?: string
  groupId?: any
  validFrom?: any
  validTo?: any
  isDefault?: boolean
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
