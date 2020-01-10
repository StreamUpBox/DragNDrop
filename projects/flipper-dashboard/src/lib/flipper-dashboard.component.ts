import { Component, Input } from '@angular/core';
import { DashBoardEntries } from '@enexus/flipper-components';

@Component({
  selector: 'flipper-dashboard',
  templateUrl: './flipper-dashboard.component.html',
  styleUrls: ['./flipper-dashboard.component.css'],
})
export class FlipperDashboardComponent {
  @Input() dashboardEntries: DashBoardEntries={};
}
