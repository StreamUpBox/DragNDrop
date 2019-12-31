import {
  Component,
  Input,
  EventEmitter,
  Output,
  HostListener,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit
} from '@angular/core';
import {
  Order,
  CalculateTotalClassPipe,
  FindKeyPipe,
  Shoppings,
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

  currentNumber = '0';

  isNegativeNumber = false;

  private isCurrentOrder: Order = null;
  @Output() saveOrderUpdatedEmit = new EventEmitter < Order > ();
  @Output() collectCashEmit = new EventEmitter < boolean > ();
  //collectCash
  @Input('currentOrder')
  set currentOrder(order: Order) {
    this.isCurrentOrder = order;
  }
  get currentOrder(): Order {
    return this.isCurrentOrder;
  }

  @Input() currency:string='RWF';
  
  private didCollectCashCompleted: object = {
    isCompleted: false as boolean,
    collectedOrder: null as Order
  };
  //collectCashCompleted
  @Input('collectCashCompleted')
  set collectCashCompleted(inputed: object) {
    this.didCollectCashCompleted = inputed;
    this.getCollectCashCompleted(inputed);

  }
  get collectCashCompleted(): object {
    return this.didCollectCashCompleted;
  }
  public isCalculatorNumOpen = false;
  public calculatorNums = [];


  getCollectCashCompleted(inputed) {
    if (inputed && inputed.isCompleted) {
      let changeDue = inputed.collectedOrder.customerChangeDue == 0 || 
         inputed.collectedOrder.customerChangeDue == '0.00' ? 'No' :
        this.randPipe.transform(inputed.collectedOrder.customerChangeDue);
      let cahsReceived = this.randPipe.transform(inputed.collectedOrder.cashReceived);
      return this.dialog.message('Success Message', changeDue + ' change out of ' + cahsReceived, 'Success', 'SIZE_MD');
    }
  }


  @ViewChild('mySearchInput', {
    static: false
  }) public searchInputElement: ElementRef = null;
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    
    if (!this.currentOrder) {
      return;
    }

    if (event.key === 'Enter' ||  event.key === 'End' ) { 
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
    if (!(event.target['type'] === 'search')) {
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
  constructor(private totalPipe: CalculateTotalClassPipe,
    public dialog: DialogService,
    private randPipe: RoundNumberPipe,
    private findKeyPipe: FindKeyPipe) {}


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
      return this.dialog.message('Failure Message', 'No current order created!', 'Failure', 'SIZE_SM');
    }
    this.isCalculatorNumOpen = true;
    this.calculatorNums.push(v);
    const nums = this.calculatorNums.join('');
    this.getNumberOnKeyPress(nums);
  }

  public makeTotal() {
    if (this.currentOrder) {

      const subTotal = this.totalPipe.transform < Shoppings > (this.currentOrder.orderItems, 'subTotal');
      if (subTotal <= 0) {
        this.isCalculatorNumOpen = false;
        this.calculatorNums.pop();
        return this.dialog.message('Failure Message', 'No shopping list could found!', 'Failure', 'SIZE_SM');
      }
      this.currentOrder.cashReceived = this.currentNumber;

      this.currentOrder.customerChangeDue = this.currentOrder.cashReceived > 0 ? this.currentOrder.cashReceived - subTotal : 0.00;

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
    this.collectCashEmit.emit(false);
    if (this.currentOrder.subTotal <= 0) {
      return this.dialog.message('Failure Message', 'No shopping list could found!', 'Failure', 'SIZE_SM');

    }
    if (this.currentOrder.customerChangeDue < 0) {
      return this.dialog.message('Failure Message', "Cash received can't less than 0!", 'Failure', 'SIZE_SM');

    }
    if (this.currentOrder.customerChangeDue == 0) {
      this.currentOrder.cashReceived = parseInt(this.currentOrder.subTotal);
      this.currentOrder.customerChangeDue = parseInt(this.currentOrder.cashReceived) - parseInt(this.currentOrder.subTotal);
    }
    this.currentOrder.cashReceived = parseInt(this.currentOrder.cashReceived);
    this.currentOrder.isActive = false;

    this.saveOrderUpdatedEmit.emit(this.currentOrder);
    this.collectCashEmit.emit(true);
    this.currentOrder = null;
    this.isCalculatorNumOpen = false;
    this.calculatorNums = [];
  }

}
