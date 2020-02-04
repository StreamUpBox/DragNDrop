export class Branch {
  id?: number;
  name?: string;
  active?: boolean;
  businessId?: number;
  syncedOnline?: boolean;
  mapLatitude?: number;
  mapLongitude?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(params: object = {}) {
    for (const name in params) {
      this[name] = params[name];
    }
  }
}
