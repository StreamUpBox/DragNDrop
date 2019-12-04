export class User {
id?:number;
name?:string;
email?:string;
constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}

