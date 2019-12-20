import { Component, OnDestroy } from '@angular/core';
import { FlipperEventBusService } from 'projects/flipper-event/src/public_api';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OrderEvent } from './event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy { 
  private selectedSubscription: Subscription;

  canGottenProduct: string;

  constructor(private eventBus: FlipperEventBusService) {

      this.addProducts();
  }

get gottenProduct(): string {
    return this.canGottenProduct;
}

set gottenProduct(value: string) {
    this.canGottenProduct = value;
}

  
  public addProducts() {
    this.eventBus.publish(new OrderEvent({ id: 100, orderno: '#O100', reference: '#0100-kigali' }));
  }
 

  ngOnDestroy() {
    this.selectedSubscription.unsubscribe();
  }
  

  public searchPosProduct(event) {
    if (event) {
      this.selectedSubscription = this.eventBus.of<OrderEvent>(OrderEvent.CHANNEL)
      .pipe(filter(event => event.order.id === 100))
      .subscribe(event => console.log(event));
    }

  }

}
