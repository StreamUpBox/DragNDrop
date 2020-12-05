export class Device {
  id?: any
  name?: string
  branchId?: any
  token?: string
  syncedOnline?: boolean
  createdAt: string
  updatedAt: string
  table?: string
  docId?: string
  channels: Array<string>
  channel?: any

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name]
    }
  }
}
