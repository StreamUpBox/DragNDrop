import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'flipper-menu',
  templateUrl: './flipper-menu.component.html',
  styleUrls: ['./flipper-menu.component.css']
})
export class FlipperMenuComponent implements OnInit {
  isToggled:boolean=false;
  constructor() { }

  ngOnInit() {
  }
  
  toggled(){
     this.isToggled=!this.isToggled;
  }
}
