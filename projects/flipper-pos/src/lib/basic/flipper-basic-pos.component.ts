import {Component, Output, EventEmitter, Input, ViewEncapsulation, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {Order, Variant, CalculateTotalClassPipe, MergeArryByIdPipe, ArrayRemoveItemPipe, OrderDetails} from '@enexus/flipper-components';
import {BehaviorSubject} from 'rxjs';
import { DialogService, DialogSize } from '@enexus/flipper-dialog';
import { UpdatePriceDialogComponent } from '../common/update-price-dialog/update-price-dialog.component';
import { AddCartItemDialogComponent } from '../common/add-cart-item-dialog/add-cart-item-dialog.component';



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
  @Output() addToCartEmit = new EventEmitter < {variant: Variant, quantity: number, tax: string} > ();
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
    this.cartFocused = order && order.orderItems.length > 0 ? order.orderItems[0] : null;

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
   if (event.ctrlKey && event.key === 'N') {// shift + k
        this. addCartItem();
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


  addToCart(variant: Variant, quantity= 1, tax= null) {

    if (variant.priceVariant.retailPrice === 0 || variant.priceVariant.retailPrice === 0.00) {
      return this.dialog.open(UpdatePriceDialogComponent, DialogSize.SIZE_SM, variant.priceVariant.retailPrice).subscribe(result => {
        if (result !== 'close') {
          if (result.price && result.price > 0) {
            variant.priceVariant.retailPrice = result.price;

            this.addToCartEmit.emit({variant, quantity, tax});
          }

        }

      });

    } else {
      this.addToCartEmit.emit({variant, quantity, tax});
    }

  }
  updatePrice(item: OrderDetails) {
    return this.dialog.open(UpdatePriceDialogComponent, DialogSize.SIZE_SM, item.price).subscribe(result => {

      if (result !== 'close') {
      if (result.price  && result.price > 0) {
        item.price = result.price;
        item.subTotal = item.quantity * item.price;
        this.updateQty(item);
      }
    }

    });
  }

  addCartItem() {
    return this.dialog.open(AddCartItemDialogComponent, DialogSize.SIZE_MD).subscribe(result => {
      if (result !== 'close' || result.price > 0 || result.quantity > 0) {

        const variation: Variant = {unit: result.unit, name: result.name, SKU: 'p' + Math.floor(Math.random() * 100),
         productName: result.name,

        priceVariant: {
                   id: 0,
                   priceId: 0,
                   variantId: 0,
                   minUnit: 0,
                   maxUnit: 0,
                   retailPrice: result.price,
                   supplyPrice: 0,
                   wholeSalePrice: 0,
                   discount: 0,
                   markup: 0
        }, stock: {
          canTrackingStock: false,
          currentStock: 0,
          id: 0
        }
      };

        this.addToCart(variation, result.quantity, result.tax);

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
    order.taxAmount = this.totalPipe.
    transform<OrderDetails>(order.orderItems, 'taxAmount');

    order.saleTotal = order.subTotal + order.taxAmount ;

    order.cashReceived = order.cashReceived ? order.cashReceived : order.saleTotal;
    order.customerChangeDue = order.cashReceived > 0 ?
    order.cashReceived - order.saleTotal : 0.00;

    order.customerChangeDue = order.customerChangeDue;

    this.saveOrderUpdatedEmit.emit(order);
  }


  updateQuantity(item: OrderDetails, action = null) {
    const lastQty = item.quantity;
    this.action = action;
    if (this.action === '-') {
      item.quantity = item.quantity - 1;
      if (item.quantity <= 0) {
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
