export class UserBusiness {
  id: string
  userId: string
  businessId: string
  role?: string
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
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
