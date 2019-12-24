import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Order, CalculateTotalClassPipe, Shoppings } from '@enexus/flipper-components';

@Component({
  selector: 'flipper-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  currentNumber = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;

  isNegativeNumber = false;

  private isCurrentOrder: Order = null;

  @Output() saveOrderUpdatedEmit = new EventEmitter < Order > ();

  @Input('currentOrder') set currentOrder(order: Order) {
    this.isCurrentOrder = order;

  }
  get currentOrder(): Order {
    return this.isCurrentOrder;
  }

  constructor(private totalPipe: CalculateTotalClassPipe) { }

  ngOnInit() {
  }

  public clear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
    if (this.currentOrder) {
      this.currentOrder.cashReceived = 0;
      this.currentOrder.customerChangeDue = 0;
      this.isNegativeNumber = false;
    }
  }




  getDecimal() {
    if (!this.currentNumber.includes('.')) {
        this.currentNumber += '.';
    }
  }

  public getNumber(v: string) {

      this.currentNumber === '0' ? this.currentNumber = v : this.currentNumber += v;
      this.makeTotal();
  }

  public makeTotal() {
    this.isNegativeNumber = false;
    if (this.currentOrder) {
      this.currentOrder.cashReceived = this.currentNumber;
      const subTotal = this.totalPipe.transform<Shoppings>(this.currentOrder.orderItems, 'subTotal');
      this.currentOrder.customerChangeDue = this.currentOrder.cashReceived > 0 ? this.currentOrder.cashReceived - subTotal : 0.00;

      if (this.currentOrder.customerChangeDue  >= 0) {
        this.currentOrder.customerChangeDue = this.currentOrder.customerChangeDue;
        this.saveOrderUpdatedEmit.emit(this.currentOrder);
      } else {
        this.isNegativeNumber = true;
      }
    }
  }

}
