export class Menu {
  id?: string;
  name?: string;
  icon?: string;
  route?: string;
  active?: boolean;
  isSetting?: boolean;
  // FIXME(ganza): each model or document should have channels[userId] to authenticate the data
  createdAt: string;
  updatedAt: string;
  channels:Array<string>;

  channel?:string;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
