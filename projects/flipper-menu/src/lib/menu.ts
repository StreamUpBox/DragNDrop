export class Menu {
  id?: number;
  name?: string;
  icon?: string;
  route?: string;
  active?: boolean;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
