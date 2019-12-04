export class Menu {
id?:number;
name?:string;
icon?:string;
route?:string;
active?:boolean;
constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
