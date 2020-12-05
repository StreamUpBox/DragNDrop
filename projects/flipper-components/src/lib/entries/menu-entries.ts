import { Business } from './business'
import { User } from './user'
import { Branch } from './branch'
import { Menu } from './menu'

export class MenuEntries {
  id?: string
  businesses: Business[]
  user: User
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
  branches: Branch[]
  menu: Menu[]

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name]
    }
  }
}
