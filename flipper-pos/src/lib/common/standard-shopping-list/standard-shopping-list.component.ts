import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'flipper-standard-shopping-list',
  templateUrl: './standard-shopping-list.component.html',
  styleUrls: ['./standard-shopping-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardShoppingListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
