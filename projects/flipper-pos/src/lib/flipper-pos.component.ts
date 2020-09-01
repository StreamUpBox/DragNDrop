import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as alasql from 'alasql';

const sql = alasql;
@Component({
  selector: 'flipper-flipper-pos',
  template: `
    <p>
      flipper-pos works!
    </p>
  `,
  styles: []
})
export class FlipperPosComponent implements OnInit {

  constructor() {
   
  }

  ngOnInit() {
  
  }

}

