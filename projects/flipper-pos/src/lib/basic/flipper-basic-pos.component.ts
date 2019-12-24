import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  Order,
  Variant,
  Shoppings,
  CalculateTotalClassPipe
} from '@enexus/flipper-components';
import { BehaviorSubject } from 'rxjs';
// TODO: please do not delete down code it is a sample of sql in angular.
// import * as alasql from 'alasql';
// const sql = alasql;
@Component({
  selector: 'flipper-basic-pos',
  templateUrl: './flipper-basic-pos.component.html',
  styleUrls: ['./flipper-basic-pos.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlipperBasicPosComponent implements OnChanges {
 
 
  
  @Output() updateQtyEmit = new EventEmitter < Shoppings > ();
  @Output() searchEmitValue = new EventEmitter < string > ();
  @Output() addToCartEmit = new EventEmitter < Variant > ();
  @Output() saveOrderUpdatedEmit = new EventEmitter < Order > ();
  action='';
  orderItems$ = new BehaviorSubject<Shoppings[]>([]);

  private canGottenVariant: Variant[] = [];
  private isCurrentOrder: Order = null;

  @Input('gottenVariant') set gottenVariant(value: Variant[]) {
    this.canGottenVariant = value; 
  }
  @Input('currentOrder') set currentOrder(order: Order) {
  
    this.isCurrentOrder = order;
  
  }

  constructor(private totalPipe:CalculateTotalClassPipe) {
  //  this.ref.detectChanges();
  }
  


  get gottenVariant(): Variant[] {
    return this.canGottenVariant;
  }

  get currentOrder(): Order {
    return this.isCurrentOrder;
  }

  public searchPosProduct(event) {
    if (event) {
      this.searchEmitValue.emit(event);
    }
  }

  addToCart(variant: Variant) {
    this.addToCartEmit.emit(variant);
  }

  updateQty(item:Shoppings){

    let orderItems:Shoppings[]=this.currentOrder.orderItems;

    orderItems = orderItems.filter(i => i.id !== item.id);

    if (!orderItems.find(b => b.id === item.id)) {
      orderItems.push(item);
    }
    
    this.currentOrder.orderItems=orderItems;

    this.currentOrder.subTotal=this.totalPipe.transform<Shoppings>(this.currentOrder.orderItems,'subTotal');
      this.currentOrder.customerChangeDue=this.currentOrder.cashReceived > 0?this.currentOrder.cashReceived-this.totalPipe.transform<Shoppings>(this.currentOrder.orderItems,'subTotal'):0.00;
      this.currentOrder.customerChangeDue=this.currentOrder.customerChangeDue;
      if(this.currentOrder.customerChangeDue  > 0){
        this.saveOrderUpdatedEmit.emit(this.currentOrder);
      }
    
  }

  

  removeItem(item:Shoppings){
    let orderItems:Shoppings[]=this.currentOrder.orderItems;

    orderItems = orderItems.filter(i => i.id !== item.id);

    if (orderItems.length <= 0) {
      this.currentOrder.orderItems=[];
    }

    this.currentOrder.orderItems=orderItems;
   

    this.currentOrder.subTotal=this.totalPipe.transform<Shoppings>(this.currentOrder.orderItems,'subTotal');
    this.currentOrder.customerChangeDue=this.currentOrder.cashReceived > 0?this.currentOrder.cashReceived-this.totalPipe.transform<Shoppings>(this.currentOrder.orderItems,'subTotal'):0.00;
    this.currentOrder.customerChangeDue=this.currentOrder.customerChangeDue;
    if(this.currentOrder.customerChangeDue  > 0){
      this.saveOrderUpdatedEmit.emit(this.currentOrder);
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
   console.log(changes);
  }

  saveOrderUpdated(event:Order){
      this.saveOrderUpdatedEmit.emit(event);
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
    this.updateQty(item);
  }

  // removeItem(item:Shoppings){
  //   this.removeItemEmit.emit(item);
  // }
  // links = ['First', 'Second', 'Third'];
  // activeLink = this.links[0];
  // background = '';


  // addLink() {
  //   this.links.push(`Link ${this.links.length + 1}`);
  // }

}
