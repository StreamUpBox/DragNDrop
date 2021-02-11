export class UserBusiness {
  id: string
  userId: string
  businessId: string
  role?: string
  permissions?: any
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
