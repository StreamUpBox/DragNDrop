import { Component, Input } from '@angular/core';

@Component({
  selector: 'flipper-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
  private load: boolean;
  @Input('loading') set loading(value: boolean) {
    this.load = value;
  }
  get loading(): boolean {
    return this.load;
  }

}
