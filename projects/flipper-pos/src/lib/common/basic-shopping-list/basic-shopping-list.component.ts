import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Shoppings } from '@enexus/flipper-components';

@Component({
  selector: 'flipper-basic-shopping-list',
  templateUrl: './basic-shopping-list.component.html',
  styleUrls: ['./basic-shopping-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicShoppingListComponent implements OnChanges {
  public loading = false;
  action='';
  private getOrderItems: Shoppings[] = [];
  @Output() updateQtyEmit = new EventEmitter < Shoppings > ();
  @Output() removeItemEmit = new EventEmitter < Shoppings > ();
  
  
  @Input('orderItems') set orderItems(value: Shoppings[]) {
    this.getOrderItems = value; 
  }
  get orderItems(): Shoppings[] {
    return this.getOrderItems;
  }

  
  updateQuantity(item:Shoppings,action=null){
    const lastQty=item.quantity;
    this.action=action;
    if(this.action==='-'){
      item.quantity=item.quantity-1;
      if(item.quantity < 0){
        alert('Negative quantity is not allowed.');
        item.quantity=lastQty;
      }
    }else if(this.action==='+'){
      item.quantity=item.quantity+1;
      
    }
    item.subTotal=item.price*item.quantity;
    this.updateQtyEmit.emit(item);

  }

  removeItem(item:Shoppings){
    this.removeItemEmit.emit(item);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
   }
}
