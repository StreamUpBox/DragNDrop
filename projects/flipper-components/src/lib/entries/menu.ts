export class Menu {
  id?: any;
  name?: string;
  icon?: string;
  route?: string;
  active?: boolean;
  isSetting?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  chanels?:any;
  chanel?:any;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
