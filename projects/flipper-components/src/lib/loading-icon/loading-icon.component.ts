import { Input, Component} from '@angular/core';

@Component({
  selector: 'flipper-loading-icon',
  templateUrl: './loading-icon.component.html',
  styleUrls: ['./loading-icon.component.scss']
})
export class LoadingIconComponent {
  @Input() loading: boolean;
}
