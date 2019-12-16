export class User {
  id?: number;
  name?: string;
  email?: string;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

