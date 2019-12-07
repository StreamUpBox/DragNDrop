import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[flipperDynamicButton]'
})
export class DynamicButtonDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
