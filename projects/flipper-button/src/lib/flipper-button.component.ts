import { Component, ViewChild, Input, AfterViewInit, ComponentRef, OnDestroy, OnInit, ElementRef, Renderer2 } from '@angular/core';




@Component({
  selector: 'flipper-button',
  templateUrl: './flipper-button.component.html',
  styleUrls: ['./flipper-button.component.css']
})
export class FlipperButtonComponent implements OnInit, AfterViewInit {

  @Input() color: string;
  @Input() text: string = 'button';
  @Input() width: string;
  @Input() height: string;
  @Input() shape: any = 'circle';
  @Input() icon: any = '';

  @ViewChild('element', { static: false }) element: ElementRef;


  public componentRef: ComponentRef<any>;

  button: string;

  constructor(private render: Renderer2) { }


  ngOnInit() {

  }
  ngAfterViewInit(): void {
    if (this.color == 'blue') {
      let blue = this.element.nativeElement;
      this.render.setStyle(blue, 'background', '#0093ee');
    } else if (this.color == 'green') {
      let green = this.element.nativeElement;
      this.render.setStyle(green, 'background', '#4ece3d');
    } else if (this.color == 'dark') {
      let dart = this.element.nativeElement;
      this.render.setStyle(dart, 'background', '#4ece3d');
    } else {
      let d = this.element.nativeElement;
      this.render.setStyle(d, 'background', '#4ece3d');
    }
  }
}
