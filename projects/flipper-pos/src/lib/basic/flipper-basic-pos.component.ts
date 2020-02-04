import {Component, Output, EventEmitter, Input, ViewEncapsulation, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {Order, Variant, CalculateTotalClassPipe, MergeArryByIdPipe, ArrayRemoveItemPipe, OrderDetails} from '@enexus/flipper-components';
import {BehaviorSubject} from 'rxjs';
import { DialogService, DialogSize } from '@enexus/flipper-dialog';
import { UpdatePriceDialogComponent } from '../common/update-price-dialog/update-price-dialog.component';

@Component({
  selector: 'flipper-basic-pos',
  templateUrl: './flipper-basic-pos.component.html',
  styleUrls: ['./flipper-basic-pos.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CalculateTotalClassPipe, MergeArryByIdPipe, ArrayRemoveItemPipe]
})
export class FlipperBasicPosComponent  {

  @Output() updateQtyEmit = new EventEmitter < OrderDetails > ();
  @Output() searchEmitValue = new EventEmitter < string > ();
  @Output() addToCartEmit = new EventEmitter < Variant > ();
  @Output() saveOrderUpdatedEmit = new EventEmitter < Order > ();
  @Output() updateOrderDetailsEmit = new EventEmitter < object > ();
  @Output() didCollectCashEmit = new EventEmitter < boolean > ();

  action = '';
  orderItems$ = new BehaviorSubject < OrderDetails[] > ([]);

  private canfoundVariant: Variant[] = [];
  private isCurrentOrder: Order = null;
  private userClosedModel = false;

  @Input() currency = 'RWF';

  @Input('foundVariant')
  set foundVariant(value: Variant[]) {
    this.canfoundVariant = value;
  }
  get foundVariant(): Variant[] {
    return this.canfoundVariant;
  }

  @Input('currentOrder')
  set currentOrder(order: Order) {
    this.isCurrentOrder = order;

  }

  get currentOrder(): Order {
    return this.isCurrentOrder;
  }

  private setCartFocused: OrderDetails = null;

  set cartFocused(cart: OrderDetails) {
    this.setCartFocused = cart;

  }
  get cartFocused(): OrderDetails {
    return this.setCartFocused;
  }

  // didCloseModel
  set userDidCloseModel(m: boolean) {
    this.userClosedModel = m;

  }
  get userDidCloseModel(): boolean {
    return this.userClosedModel;
  }

  private didCollectCashCompleted: object = {isCompleted: false, collectedOrder: null};
  // collectCashCompleted

  @Input('collectCashCompleted')
  set collectCashCompleted(inputed: object) {
    this.didCollectCashCompleted = inputed;

  }
  get collectCashCompleted(): object {
    return this.didCollectCashCompleted;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {

    // delete key
   if (this.cartFocused) {
    if (event.key === 'Delete') {
        this.removeItem(this.cartFocused);
      }
    if (event.shiftKey && event.key === '+') { // shift + (+)
        this.updateQuantity(this.cartFocused, '+');
      }

    if (event.shiftKey && event.key === '-') {// shift + (-)
        this.updateQuantity(this.cartFocused, '-');
      }

    }
   if (event.shiftKey && event.key === 'K') {// shift + k
      this. keyBoardShortCuts();
    }
  }

  constructor(
    public dialog: DialogService,
    private totalPipe: CalculateTotalClassPipe) {}

  keyBoardShortCuts() {
      this.dialog.keyBoardShortCuts();
    }

  public searchPosProduct(event) {
    if (event) {
      this.searchEmitValue.emit(event);
    }
  }


  addToCart(variant: Variant) {
    if (variant.priceVariant.retailPrice === 0 || variant.priceVariant.retailPrice === 0.00) {
      return this.dialog.open(UpdatePriceDialogComponent, DialogSize.SIZE_SM, variant.priceVariant.retailPrice).subscribe(result => {
        if (result !== 'close') {
          if (result.price && result.price > 0) {
            variant.priceVariant.retailPrice = result.price;
            this.addToCartEmit.emit(variant);
          }

        }

      });

    } else {
      this.addToCartEmit.emit(variant);
    }

  }
  updatePrice(item: OrderDetails) {
    return this.dialog.open(UpdatePriceDialogComponent, DialogSize.SIZE_SM, item.price).subscribe(result => {
      if (result !== 'close' || result.price > 0) {
        item.price = result.price;
        item.subTotal = item.quantity * item.price;
        this.updateQty(item);
      }

    });
  }


  updateQty(item: OrderDetails) {
    this.updateOrderDetailsEmit.emit({action: 'UPDATE', item});
  }



  removeItem(item: OrderDetails) {
   this.updateOrderDetailsEmit.emit({action: 'DELETE', item});
  }



  saveOrderUpdated(event?: Order) {

    const order = event ? event : this.currentOrder;

    order.subTotal = this.totalPipe.
    transform<OrderDetails>(order.orderItems, 'subTotal');

    order.customerChangeDue = order.cashReceived > 0 ?
    order.cashReceived - order.subTotal : 0.00;

    order.customerChangeDue = order.customerChangeDue;

    this.saveOrderUpdatedEmit.emit(order);
  }


  updateQuantity(item: OrderDetails, action = null) {
    const lastQty = item.quantity;
    this.action = action;
    if (this.action === '-') {
      item.quantity = item.quantity - 1;
      if (item.quantity < 0) {
        this.dialog.message('Failure Message', 'Negative quantity is not allowed.', 'Failure', 'SIZE_SM').subscribe(() => {
          item.quantity = lastQty;
        });
        item.quantity = lastQty;
      }
    } else if (this.action === '+') {
      item.quantity = item.quantity + 1;

    }
    item.subTotal = item.price * item.quantity;
    this.updateQty(item);
  }
  canSetCartFocused(item) {
    this.cartFocused = item;
  }

  collectCash(event) {
      if (event === true) {
          this.currentOrder = null;
      }
      this.didCollectCashEmit.emit(event);

  }

  closeModel(event) {
      this.userDidCloseModel = event;
  }

}
