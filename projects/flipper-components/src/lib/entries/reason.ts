export class Reason {
  id?: any;
  name?: string;
  operation?: string;
  active?: boolean;
  syncedOnline?: boolean;
  createdAt?: Date;
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
  updatedAt?: Date;
  table?:string;
  docId?:string;
  
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
