import { Component, ViewChild, Input, AfterViewInit, ComponentRef, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';




@Component({
  selector: 'flipper-button',
  templateUrl: './flipper-button.component.html',
  styleUrls: ['./flipper-button.component.css']
})
export class FlipperButtonComponent implements  AfterViewInit {

  @Input() color: string;
  @Input() text: string = 'button';
  @Input() width: string;
  @Input() height: string;
  @Input() shape: any = 'circle';
  @Input() icon: any;
  @Output() didClickButton: any = new EventEmitter<boolean>();

  @ViewChild('element', { static: false }) element: ElementRef;


  public componentRef: ComponentRef<any>;

  button: string;

  constructor(private render: Renderer2) { }

  ngAfterViewInit(): void {
    if (this.color == 'blue') {
      let blue = this.element.nativeElement;
      this.render.setStyle(blue, 'background', '#0093ee');
    } else if (this.color == 'green') {
      let green = this.element.nativeElement;
      this.render.setStyle(green, 'background', '#4ece3d');
    } else if (this.color == 'dark') {
      let dark = this.element.nativeElement;
      this.render.setStyle(dark, 'background', '#4ece3d');
    } else {
      let d = this.element.nativeElement;
      this.render.setStyle(d, 'background', '#4ece3d');
    }
  }
  handleButtonClick() {
    this.didClickButton.emit(true);
  }
}

