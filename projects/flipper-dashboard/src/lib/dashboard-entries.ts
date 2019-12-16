export class DashBoardEntries {
  id?: number;
  total_store?: Total;
  gross_profit?: Total;
  net_profit?: Total;
  sold_items?: Items[];
  selling_branches?: Items[];
  constructor(params: Object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}


export class Total {
  id?: number;
  value?: any;
  percentage?: number;
  since?: string;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}


export class Items {
  id?: number;
  name?: string;
  updated_at?: any;
  items?: number;
  total?: number;

  constructor(params: Object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}

