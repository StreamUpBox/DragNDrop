export class Price {
  id: string;
  name: string;
  branchId?: string;
  groupId?: any;
  validFrom?: any;
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
  validTo?: any;
  isDefault?: boolean;
  syncedOnline?: boolean;
  createdAt: string;
  updatedAt: string;
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
