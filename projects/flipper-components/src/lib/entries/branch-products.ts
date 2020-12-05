export class BranchProducts {
  id: string
  branchId: string
  productId: string
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
