export class User {
  id?: any;
  name?: string;
  email?: string;
  token?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  table?:string;
  docId?:string;
  chanels?:any;
  chanel?:any;
  
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

