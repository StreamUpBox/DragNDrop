export class Types {
  id?: number;
  name?: string;
  syncedOnline?: boolean;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

