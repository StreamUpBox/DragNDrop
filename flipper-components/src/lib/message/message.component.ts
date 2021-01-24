import { Component, Input } from '@angular/core'

@Component({
  selector: 'flipper-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() icon = 'search.svg'
  @Input() title = ''
  @Input() message = ''
}
