import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core'
import {
  Order,
  Variant,
  CalculateTotalClassPipe,
  MergeArryByIdPipe,
  ArrayRemoveItemPipe,
  OrderDetails,
  Taxes,
} from '@enexus/flipper-components'
import { BehaviorSubject } from 'rxjs'
import { DialogService, DialogSize } from '@enexus/flipper-dialog'
import { UpdatePriceDialogComponent } from '../common/update-price-dialog/update-price-dialog.component'
import { AddCartItemDialogComponent } from '../common/add-cart-item-dialog/add-cart-item-dialog.component'

@Component({
  selector: 'flipper-basic-pos',
  templateUrl: './flipper-basic-pos.component.html',
  styleUrls: ['./flipper-basic-pos.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CalculateTotalClassPipe, MergeArryByIdPipe, ArrayRemoveItemPipe],
})
export class FlipperBasicPosComponent {
  @Output() updateQtyEmit = new EventEmitter<OrderDetails>()
  @Output() searchEmitValue = new EventEmitter<string>()
  @Output() addToCartEmit = new EventEmitter<{ variant: Variant; quantity: number; tax: string }>()
  @Output() saveOrderUpdatedEmit = new EventEmitter<Order>()
  @Output() updateOrderDetailsEmit = new EventEmitter<object>()
  @Output() didCollectCashEmit = new EventEmitter<boolean>()

  action = ''
  orderItems$ = new BehaviorSubject<OrderDetails[]>([])

  private canfoundVariant: Variant[] = []
  private isCurrentOrder: Order = null
  private userClosedModel = false
  private setTaxes: Taxes[] = []
  @Input() currency = 'RWF'

  @Input('foundVariant')
  set foundVariant(value: Variant[]) {
    this.canfoundVariant = value
  }
  get foundVariant(): Variant[] {
    return this.canfoundVariant
  }
  //taxes
  @Input('taxes')
  set taxes(value: Taxes[]) {
    this.setTaxes = value
  }
  get taxes(): Taxes[] {
    return this.setTaxes
  }
  @Input('currentOrder')
  set currentOrder(order: Order) {
    this.isCurrentOrder = order
    this.cartFocused = order && order.orderItems.length > 0 ? order.orderItems[0] : null
  }

  get currentOrder(): Order {
    return this.isCurrentOrder
  }

  private setCartFocused: OrderDetails = null

  set cartFocused(cart: OrderDetails) {
    this.setCartFocused = cart
  }
  get cartFocused(): OrderDetails {
    return this.setCartFocused
  }

  // didCloseModel
  set userDidCloseModel(m: boolean) {
    this.userClosedModel = m
  }
  get userDidCloseModel(): boolean {
    return this.userClosedModel
  }

  private didCollectCashCompleted: object = { isCompleted: false, collectedOrder: null }
  // collectCashCompleted

  @Input('collectCashCompleted')
  set collectCashCompleted(inputed: object) {
    this.didCollectCashCompleted = inputed
  }
  get collectCashCompleted(): object {
    return this.didCollectCashCompleted
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    // delete key
    if (this.cartFocused) {
      if (event.key === 'Delete') {
        this.removeItem(this.cartFocused)
      }
      if (event.shiftKey && event.key === '+') {
        // shift + (+)
        this.updateQuantity(this.cartFocused, '+')
      }

      if (event.shiftKey && event.key === '-') {
        // shift + (-)
        this.updateQuantity(this.cartFocused, '-')
      }
    }
    if (event.shiftKey && event.key === 'K') {
      // shift + k
      this.keyBoardShortCuts()
    }
    if (event.ctrlKey && event.key === 'N') {
      // shift + k
      this.addCartItem()
    }
  }

  constructor(public dialog: DialogService, private totalPipe: CalculateTotalClassPipe) {}

  keyBoardShortCuts() {
    this.dialog.keyBoardShortCuts()
  }

  public searchPosProduct(event) {
    if (event) {
      this.searchEmitValue.emit(event)
    }
  }

  addToCart(item, updateProduct = false) {
    if (updateProduct) {
      return this.dialog.open(UpdatePriceDialogComponent, DialogSize.SIZE_SM, item.price).subscribe(result => {
        if (result !== 'close') {
          if (result.price && result.price > 0) {
            this.addToCartEmit.emit(result)
          }
        }
      })
    } else {
      this.addToCartEmit.emit(item)
    }
  }
  updatePrice(item: OrderDetails) {
    return this.dialog.open(UpdatePriceDialogComponent, DialogSize.SIZE_SM, item.retailPrice).subscribe(result => {
      if (result !== 'close') {
        if (result.price && result.price > 0) {
          item.retailPrice = result.price
          item.subTotal = item.quantity * item.retailPrice
          this.updateQty(item)
        }
      }
    })
  }

  addCartItem() {
    return this.dialog.open(AddCartItemDialogComponent, DialogSize.SIZE_MD, this.taxes).subscribe(result => {
      if (result !== 'close' || result.price > 0 || result.quantity > 0) { //just a clarification, close here does not refer to dialog close but our actual close button
        this.addToCart(result)
      }
    })
  }

  updateQty(item: OrderDetails) {
    this.updateOrderDetailsEmit.emit({ action: 'UPDATE', item })
  }

  removeItem(item: OrderDetails) {
    this.updateOrderDetailsEmit.emit({ action: 'DELETE', item })
  }

  saveOrderUpdated(event?: Order) {
    const order = event ? event : this.currentOrder
    this.saveOrderUpdatedEmit.emit(order)
  }

  updateQuantity(item: OrderDetails, action = null) {
    // console.log('about increment',item);
    const lastQty = item.quantity
    this.action = action
    this.canSetCartFocused(item)
    if (this.action === '-') {
      item.quantity = item.quantity - 1
      if (item.quantity <= 0) {
        this.dialog
          .message('Failure Message', 'Negative quantity is not allowed.', 'Failure', 'SIZE_SM')
          .subscribe(() => {
            item.quantity = lastQty
          })
        item.quantity = lastQty
      }
      item.subTotal = item.retailPrice * item.quantity
      this.updateQty(item)
    } else if (this.action === '+') {
      item.quantity = item.quantity + 1
      item.subTotal = item.retailPrice * item.quantity
      this.updateQty(item)
    }
  }
  canSetCartFocused(item) {
    this.cartFocused = item
  }
  collectCash(event) {
    this.didCollectCashEmit.emit(event)
  }
  closeModel(event) {
    this.userDidCloseModel = event
  }
}