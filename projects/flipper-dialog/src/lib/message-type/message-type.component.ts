import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fliper-message-type',
  templateUrl: './message-type.component.html',
  styleUrls: ['./message-type.component.scss']
})
export class MessageTypeComponent implements OnInit {
  heldStatus: string;
  @Input('status')
  set status(status: string) {
    this.heldStatus = status;
  }
  get status(): string {
    return this.heldStatus;
  }
  constructor() {

  }

  ngOnInit() {
  }

}
