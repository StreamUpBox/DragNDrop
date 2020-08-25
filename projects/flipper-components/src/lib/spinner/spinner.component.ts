import {Component, HostBinding, Input, OnInit} from '@angular/core';
import { ColorToFillClassPipe, Color } from '@enexus/flipper-color';

@Component({
  selector: 'flipper-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {


  @Input() color: Color = 'primary';
  @Input() size = 24;

  @HostBinding('class')
  get hostClass(): string {
    return this.toFill.transform(this.color);
  }

  constructor(private toFill: ColorToFillClassPipe) {
  }

  ngOnInit() {
  }

}
