export class Reason {
  id: string
  name: string
  operation?: string
  active?: boolean
  syncedOnline?: boolean
  createdAt?: string
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
