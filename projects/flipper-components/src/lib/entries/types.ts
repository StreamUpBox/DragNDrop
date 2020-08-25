export class Types {
  id?: any;
  name?: string;
  syncedOnline?: boolean;
  table?: string;
  docId?: string;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

