import { Component, ComponentFactoryResolver, ViewChild,  Input, AfterViewInit, ComponentRef, OnDestroy, OnInit, ElementRef } from '@angular/core';

import { BasicRectangleButton } from './button.component';
import { DynamicButtonDirective } from './dynamic-button.directive';



@Component({
  selector: 'flipper-button',
  templateUrl: './flipper-button.component.html',
  styleUrls: ['./flipper-button.component.css']
})
export class FlipperButtonComponent implements OnInit,AfterViewInit  {
 
 
  @Input() color: string='default';
  @Input() text: string='button';
  @Input() size: string="10";
  @Input() shape: any='circle';
  @Input() icon: any='';

  @ViewChild('change',{static:false}) change:ElementRef;
  public componentRef: ComponentRef<any>;
  
  button: string;

  @ViewChild(DynamicButtonDirective, { static: false }) dynamicButton: DynamicButtonDirective;

  constructor() { }
 

  ngOnInit() {
    
  }
  ngAfterViewInit(): void {
    console.log(this.change.nativeElement);
  }
 

}
