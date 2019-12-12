import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DashBoardEntries } from './dashboard-entries';
import { Subject } from 'rxjs';

@Component({
selector: 'flipper-dashboard',
templateUrl: './flipper-dashboard.component.html',
styleUrls: ['./flipper-dashboard.component.css'],
})
export class FlipperDashboardComponent implements OnInit {
@Input() dashboardEntries: DashBoardEntries;
  constructor() {
  }

  ngOnInit() {
  this.dashboardEntries //?
  }
  

  }
