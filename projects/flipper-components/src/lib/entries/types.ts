export class Types {
  id?: any;
  name?: string;
  syncedOnline?: boolean;
  table?:string;
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
  docId?:string;
  channels:Array<string>;

  channel?:string;

  
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

