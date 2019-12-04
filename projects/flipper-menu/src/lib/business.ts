export class Business {
id?:number;
name?:string;
active?:boolean;

constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}