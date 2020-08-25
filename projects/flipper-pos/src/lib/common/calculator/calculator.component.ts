import {
  Component,
  Input,
  EventEmitter,
  Output,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  Order,
  CalculateTotalClassPipe,
  FindKeyPipe,
  OrderDetails,
  RoundNumberPipe
} from '@enexus/flipper-components';
import {
  DialogService
} from '@enexus/flipper-dialog';

@Component({
  selector: 'flipper-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  providers: [CalculateTotalClassPipe, FindKeyPipe, RoundNumberPipe]
})
export class CalculatorComponent {
  // collectCash
  @Input('currentOrder')
  set currentOrder(order: Order) {
    this.isCurrentOrder = order;
  }
  get currentOrder(): Order {
    return this.isCurrentOrder;
  }
  // collectCashCompleted
  @Input('collectCashCompleted')
  set collectCashCompleted(inputed: object) {
    this.didCollectCashCompleted = inputed;
    this.getCollectCashCompleted(inputed);

  }
  get collectCashCompleted(): object {
    return this.didCollectCashCompleted;
  }
  @Output() closeModelEmit = new EventEmitter<boolean>();

  constructor(private totalPipe: CalculateTotalClassPipe,
              public dialog: DialogService,
              private randPipe: RoundNumberPipe,
              private findKeyPipe: FindKeyPipe) { }

  currentNumber = '0';

  isNegativeNumber = false;

  private isCurrentOrder: Order = null;
  @Output() saveOrderUpdatedEmit = new EventEmitter<Order>();
  @Output() collectCashEmit = new EventEmitter<boolean>();

  @Input() currency = 'RWF';

  private didCollectCashCompleted: object = {
    isCompleted: false as boolean,
    collectedOrder: null as Order
  };
  public isCalculatorNumOpen = false;
  public calculatorNums = [];


  @ViewChild('mySearchInput', {
    static: false
  }) public searchInputElement: ElementRef = null;


  getCollectCashCompleted(inputed) {
    if (inputed && inputed.isCompleted) {
      const changeDue = inputed.collectedOrder.customerChangeDue === 0 ||
        inputed.collectedOrder.customerChangeDue === '0.00' ? 'No' :
        this.randPipe.transform(inputed.collectedOrder.customerChangeDue);
      const cahsReceived = this.randPipe.transform(inputed.collectedOrder.cashReceived);
      return this.dialog.message('Success Message', changeDue + ' change out of ' + cahsReceived, 'Success', 'SIZE_MD').subscribe(() => {
        this.isCalculatorNumOpen = false;
        this.closeModelEmit.emit(true);
        console.log('cash collected successfully');
      });
    }
  }
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {

    if (!this.currentOrder) {
      return;
    }

    if (!(event.type === 'search' || event.type === 'number' ||
      event.type === 'text') && (event.key === 'Enter' || event.key === 'End')) {
      this.collectCash();
    }

    if ((event.shiftKey && event.key === 'F') || // shift + s
      (event.shiftKey && event.key === 'K') || // shift + k
      (event.shiftKey && event.key === 'S')) { // shift + f
      this.isCalculatorNumOpen = false;
    }
    // if not searching or not delete item on cart
    // tslint:disable
    /* tslint:disable */
    if (!(event.target['type'] === 'search' || event.target['type'] === 'number' || event.target['type'] === 'text')) {
      /* tslint:enable */
      // tslint:enable

      if (!(event.key === 'Delete' || // delete key
        (event.shiftKey && event.key === '+') || // shift + (+)
        (event.shiftKey && event.key === 'K') ||
        (event.shiftKey && event.key === 'S') ||
        (event.shiftKey && event.key === 'F') ||
        (event.shiftKey && event.key === '-')) // shift + (-)
      ) {
        this.isCalculatorNumOpen = true;

        if (this.isCalculatorNumOpen) {
          const re = /^[0-9.]+$/;
          const key = event.key;
          if (key.match(re)) {
            this.calculatorNums.push(key);
            const nums = this.calculatorNums.join('');
            this.getNumberOnKeyPress(nums);
          }
          // clean calculator by press backspace
          if (event.key === 'Backspace') {
            this.calculatorNums.pop();
            const nums = this.calculatorNums.join('');
            this.getNumberOnKeyPress(nums);
          }
        }

      } else {
        this.isCalculatorNumOpen = false;
      }

    } else {
      if (event.key === 'Shift') {
        this.isCalculatorNumOpen = !this.isCalculatorNumOpen;
      }
    }


  }


  public clear() {
    if (this.currentOrder) {
      this.calculatorNums.pop();
      const nums = this.calculatorNums.join('');
      this.getNumberOnKeyPress(nums);
    }
  }




  getDecimal() {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  public getNumberOnKeyPress(v: string) {
    this.currentNumber = v ? v : '0';
    this.makeTotal();
  }

  public getNumber(v: string) {
    if (!this.currentOrder) {
      return this.dialog.message('Failure Message', 'No current order created!', 'Failure', 'SIZE_SM').subscribe(() => {
        this.isCalculatorNumOpen = false;
        this.closeModelEmit.emit(true);
      });
    }
    this.isCalculatorNumOpen = true;
    this.calculatorNums.push(v);
    const nums = this.calculatorNums.join('');
    this.getNumberOnKeyPress(nums);
  }

  public makeTotal() {
    if (this.currentOrder) {

      const subTotal = this.totalPipe.transform<OrderDetails>(this.currentOrder.orderItems, 'subTotal');
      if (subTotal <= 0) {
        this.isCalculatorNumOpen = false;
        this.calculatorNums.pop();
        return this.dialog.message('Failure Message', 'No shopping list could found!', 'Failure', 'SIZE_SM').subscribe(() => {
          this.isCalculatorNumOpen = false;
          this.closeModelEmit.emit(true);
        });
      }
      this.currentOrder.taxAmount = this.totalPipe.
        transform<OrderDetails>(this.currentOrder.orderItems, 'taxAmount');

      this.currentOrder.saleTotal = this.currentOrder.subTotal + this.currentOrder.taxAmount;
      this.currentOrder.cashReceived = this.currentNumber;

      this.currentOrder.cashReceived = this.currentOrder.cashReceived ?
        this.currentOrder.cashReceived : this.currentOrder.saleTotal;

      this.currentOrder.customerChangeDue = this.currentOrder.cashReceived > 0 ?
        this.currentOrder.cashReceived - this.currentOrder.saleTotal : 0.00;

      this.saveOrderUpdatedEmit.emit(this.currentOrder);
    }
  }

  onKeyFocused(key) {
    if (!this.currentOrder) {
      return;
    }
    return this.findKeyPipe.transform(this.calculatorNums, key);
  }

  collectCash() {
    if (!this.currentOrder) {
      return this.dialog.message('Failure Message', 'No current order created!', 'Failure', 'SIZE_SM');
    }
    this.currentOrder.orderItems.forEach(item => {
      if (item.quantity <= 0) {
        this.dialog.message('Failure Message', 'Negative quantity is not allowed.', 'Failure', 'SIZE_SM').subscribe(() => {
        });
      }
    });
    this.collectCashEmit.emit(false);
    if (this.currentOrder.subTotal <= 0) {
      return this.dialog.message('Failure Message', 'Total to be paid is equal to zero.', 'Failure', 'SIZE_SM').subscribe(() => {
        this.isCalculatorNumOpen = false;
        this.closeModelEmit.emit(true);
      });

    }
    if (this.currentOrder.customerChangeDue < 0) {
      return this.dialog.message('Failure Message', 'Cash received can\'t less than 0!', 'Failure', 'SIZE_SM');
    }

    if (this.currentOrder.customerChangeDue === 0) {
      this.currentOrder.cashReceived = parseFloat(this.currentOrder.saleTotal);
      this.currentOrder.customerChangeDue = parseFloat(this.currentOrder.cashReceived) - parseFloat(this.currentOrder.saleTotal);
    }
    this.currentOrder.cashReceived = parseFloat(this.currentOrder.cashReceived);
    this.currentOrder.active = false;

    this.saveOrderUpdatedEmit.emit(this.currentOrder);
    this.collectCashEmit.emit(true);
    this.currentOrder = null;
    this.isCalculatorNumOpen = false;
    this.calculatorNums = [];
  }

}

