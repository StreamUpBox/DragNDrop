export class Types {
  id: string
  name: string
  syncedOnline?: boolean
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
