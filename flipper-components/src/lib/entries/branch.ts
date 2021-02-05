export class Branch {
  id:          string;
  active:      boolean;
  channels:    string[];
  location:    null;
  description: null;
  name:        string;
  businessId:  string;
  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name]
    }
  }
}
