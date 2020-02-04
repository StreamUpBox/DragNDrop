import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {OrderDetails} from '@enexus/flipper-components';

@Component({
  selector: 'flipper-basic-shopping-list',
  templateUrl: './basic-shopping-list.component.html',
  styleUrls: ['./basic-shopping-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicShoppingListComponent implements OnChanges {
  public loading = false;
  action = '';
  private getOrderItems: OrderDetails[] = [];
  @Output() updateQtyEmit = new EventEmitter < OrderDetails > ();
  @Output() removeItemEmit = new EventEmitter < OrderDetails > ();


  @Input('orderItems') set orderItems(value: OrderDetails[]) {
    this.getOrderItems = value;
  }
  get orderItems(): OrderDetails[] {
    return this.getOrderItems;
  }


  updateQuantity(item: OrderDetails, action = null) {
    const lastQty = item.quantity;
    this.action = action;
    if (this.action === '-') {
      item.quantity = item.quantity - 1;
      if (item.quantity < 0) {
        alert('Negative quantity is not allowed.');
        item.quantity = lastQty;
      }
    } else if (this.action === '+') {
      item.quantity = item.quantity + 1;

    }
    item.subTotal = item.price * item.quantity;
    this.updateQtyEmit.emit(item);

  }

  removeItem(item: OrderDetails) {
    this.removeItemEmit.emit(item);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
