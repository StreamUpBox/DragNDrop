export class Branch {
  id?: number;
  name?: string;
  active?: boolean;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
