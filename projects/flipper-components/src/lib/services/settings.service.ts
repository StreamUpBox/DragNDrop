import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  constructor() {
  }


  countries() {
    return Object.values(this.httpGet('assets/lists/countries.json'));
    }
    currencies() {
      return Object.values(this.httpGet('assets/lists/currencies.json'));
    }

    timezones() {
      return Object.values(this.httpGet('assets/lists/timezones.json'));
    }

    units() {
      return Object.values(this.httpGet('assets/lists/units.json'));
    }
    reasons() {
      return Object.values(this.httpGet('assets/lists/reasons.json'));
    }
      httpGet(theUrl) {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open( 'GET', theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return JSON.parse(xmlHttp.responseText);
    }
}
