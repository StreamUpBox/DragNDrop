import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
export interface Configuration {
  version: string
  applicationId: string
  runtimeApiUrl: string
  storageApiUrl: string
  docUrl: string
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  _config = new BehaviorSubject<Configuration>({
    version: 'version',
    applicationId: 'application',
    runtimeApiUrl: 'runtimeApiUrl',
    storageApiUrl: 'storageApiUrl',
    docUrl: 'docUrl',
  })

  constructor() {}

  set<T extends string | number | boolean>(key: string, value: T) {
    localStorage[this._prefix(key)] = value
  }

  getString(key: string, defaultValue?: string): string {
    const value = localStorage[this._prefix(key)]
    return value ? value : defaultValue
  }

  getNumber(key: string, defaultValue?: number): number {
    const value = localStorage[this._prefix(key)]
    return value ? Number.parseFloat(value) : defaultValue
  }

  getBoolean(key: string, defaultValue?: boolean): boolean {
    const value = localStorage[this._prefix(key)]
    return value ? value === 'true' : defaultValue
  }

  setItem(key: string, item: any) {
    localStorage[this._prefix(key)] = JSON.stringify(item)
  }

  getItem<T>(key: string, defaultValue?: T): any {
    key = this._prefix(key)
    try {
      return JSON.parse(localStorage[key])
    } catch (e) {
      // console.warn(`Failed to load item '${key}' from local storage.`);
      return defaultValue
    }
  }

  remove(key: string) {
    delete localStorage[this._prefix(key)]
  }

  clear() {
    localStorage.clear()
  }

  _prefix(key: string) {
    return this.version(key)
  }

  version(key: string) {
    return `${this._config.value.version}_${key}`
  }
}
