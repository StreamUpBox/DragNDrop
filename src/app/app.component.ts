import {
  Component
} from '@angular/core';
import { Schema, ModelService } from '@enexus/flipper-offline-database';
import {MainModelService, Order, Tables, Branch, STATUS, ORDERTYPE,
   Variant, Stock, Product, OrderDetails,
    CalculateTotalClassPipe, StockHistory, Business, Taxes, MenuEntries, Menu, User } from '@enexus/flipper-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor(private model: MainModelService, private query: ModelService, private totalPipe: CalculateTotalClassPipe) {
    localStorage.setItem("channel", "001");
    localStorage.setItem("bucket", "lagrace");
    localStorage.setItem("syncUrl", "http://64.227.5.49:4984");
    localStorage.setItem("canSync", "true");
  
  }
}


