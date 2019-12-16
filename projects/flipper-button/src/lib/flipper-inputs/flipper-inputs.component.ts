import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'flipper-inputs',
  templateUrl: './flipper-inputs.component.html',
  styleUrls: ['../flipper-button.component.css']
})
export class FlipperInputsComponent implements OnInit {

  @Input() type:string = 'normal';

  constructor() { }

  ngOnInit() {
  }

}
