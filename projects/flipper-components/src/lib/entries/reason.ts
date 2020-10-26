export class Reason {
  id: string;
  name: string;
  operation?: string;
  active?: boolean;
  syncedOnline?: boolean;
  createdAt?: Date;
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
  updatedAt: Date;
  table:string;
  docId?:string;
  channels:Array<string>;

  channel?:string;

  
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
