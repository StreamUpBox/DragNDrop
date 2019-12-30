import { Component, OnInit, Input, EventEmitter, Output, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Order, CalculateTotalClassPipe,FindKeyPipe, Shoppings } from '@enexus/flipper-components';

@Component({
  selector: 'flipper-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  providers:[CalculateTotalClassPipe,FindKeyPipe]
})
export class CalculatorComponent implements OnInit {

  currentNumber = '0';

  isNegativeNumber = false;

  private isCurrentOrder: Order = null;
  @Output() saveOrderUpdatedEmit = new EventEmitter < Order > ();

  @Input('currentOrder') set currentOrder(order: Order) {
    this.isCurrentOrder = order;

  }
  
  

  public isCalculatorNumOpen:boolean=false;
  public calculatorNums=[];


  get currentOrder(): Order {
    return this.isCurrentOrder;
  }
  @ViewChild('mySearchInput', {
    static: false
  }) public searchInputElement: ElementRef= null;
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
   // event.preventDefault();
   //console.log(event);
   // set focused on calculator by presskey of shift

   
    //start searching by click s or f
   
    if((event.shiftKey && event.keyCode===70) || //shift + s 
    (event.shiftKey && event.keyCode===75) || // shift + k
     (event.shiftKey && event.keyCode===83)){ //shift + f 
      this.isCalculatorNumOpen=false;
    }

    // if not searching or not delete item on cart
    if(!(event.target['type']==='search')){

      if(! ( event.keyCode===46 || //delete key
        (event.shiftKey && event.keyCode===187)  ||//shift + (+)
        (event.shiftKey && event.keyCode===75) ||
        (event.shiftKey && event.keyCode===83) || 
        (event.shiftKey && event.keyCode===70) ||
         (event.shiftKey && event.keyCode===189) ) //shift + (-)
         ){
        this.isCalculatorNumOpen=true;

        if(this.isCalculatorNumOpen){
          const re = /^[0-9.]+$/
          const key=event.key;
            if(key.match(re)){
              this.calculatorNums.push(key);
            let nums= this.calculatorNums.join('');
            this.getNumberOnKeyPress(nums);
            }
            // clean calculator by press backspace
            if(event.keyCode===8){
              this.calculatorNums.pop();
            let nums= this.calculatorNums.join('');
            this.getNumberOnKeyPress(nums);
            }
        }

    }else{
      this.isCalculatorNumOpen=false;
    }
     
    }else{
      if(event.keyCode===16)//shift
      {
        this.isCalculatorNumOpen=!this.isCalculatorNumOpen;
      }
    }
    
    
}
  constructor(private totalPipe: CalculateTotalClassPipe,private findKeyPipe:FindKeyPipe) { }

  ngOnInit() {
  }

  public clear() {
    if (this.currentOrder) {
      this.calculatorNums.pop();
      let nums= this.calculatorNums.join('');
      this.getNumberOnKeyPress(nums);
    }
  }




  getDecimal() {
    if (!this.currentNumber.includes('.')) {
        this.currentNumber += '.';
    }
  }

  public getNumberOnKeyPress(v: string) {
    this.currentNumber=v?v:'0';
    this.makeTotal();
}

  public getNumber(v: string) {
    this.isCalculatorNumOpen=true;
    this.calculatorNums.push(v);
    let nums= this.calculatorNums.join('');
    this.getNumberOnKeyPress(nums);
  }

  public makeTotal() {
    this.isNegativeNumber = false;
    if (this.currentOrder) {
      
      const subTotal = this.totalPipe.transform<Shoppings>(this.currentOrder.orderItems, 'subTotal');
      if(subTotal <= 0){
        this.isCalculatorNumOpen=false;
        this.calculatorNums.pop();
        return alert('No shopping list could found!');
      }
      this.currentOrder.cashReceived = this.currentNumber;

      this.currentOrder.customerChangeDue = this.currentOrder.cashReceived > 0 ? this.currentOrder.cashReceived - subTotal : 0.00;

      if (this.currentOrder.customerChangeDue  >= 0) {
        this.currentOrder.customerChangeDue = this.currentOrder.customerChangeDue;
        this.saveOrderUpdatedEmit.emit(this.currentOrder);
      } else {
        this.isNegativeNumber = true;
      }
    }
  }

  onKeyFocused(key){
    return this.findKeyPipe.transform(this.calculatorNums,key);
  }

}
