export class User {
  id: any
  token?: string
  updatedAt?: string
  docId?: string
  expiresAt?: any
  table?:                 string;
  name?:                  string;
  userId?:                string;
  active?:                boolean;
  email?:                 string;
  createdAt?:             null;
  channels?:              string[];
  subscriptionStartDate?: Date;
  subscriptionEndDate?:   Date;
  permissions?:           null;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name]
    }
  }
}
