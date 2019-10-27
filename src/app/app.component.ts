import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fli';
  clickCounter: number = 0;
 
  increment(){
    this.clickCounter += 1;
    if(this.clickCounter == 1){
      return this.clickCounter = 5;
    }
  }
}
