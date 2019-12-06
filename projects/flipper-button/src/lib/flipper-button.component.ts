import { Component, ComponentFactoryResolver, ViewChild, Directive, ViewContainerRef, OnInit, Input, AfterViewInit } from '@angular/core';

import { BasicCircleButton, BasicRectangleButton } from './button.component';


@Directive({
  selector: '[dynamic-host]',
})
export class DynamicComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'flipper-button',
  templateUrl: './flipper-button.component.html',
  styleUrls: ['./flipper-button.component.css']
})
export class FlipperButtonComponent implements AfterViewInit {


  @Input() buttonColor: string;
  @Input() buttonConfig: any[];
  @Input() displayText: string;
  @Input() shape: any;
  button: string;

  @ViewChild(DynamicComponentDirective, { static: true }) dynamicHost: DynamicComponentDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }


  ngAfterViewInit() {
    this.defaultButton();
  }
  defaultButton() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(BasicRectangleButton);
    // this.dynamicHost.viewContainerRef.clear();
    // this.dynamicHost.viewContainerRef.createComponent(componentFactory);
  }

}
