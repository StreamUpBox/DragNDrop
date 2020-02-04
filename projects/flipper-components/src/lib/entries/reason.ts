export class Reason {
  id?: number;
  name?: string;
  operation?: string;
  active?: boolean;
  syncedOnline?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
