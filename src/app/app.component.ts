import { Component, OnInit } from '@angular/core'
import { trigger, transition, useAnimation } from '@angular/animations'
import { fadeInAnimation, PouchDBService, PouchConfig } from '@enexus/flipper-components'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('insertPos', [transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))]),
  ],
})
export class AppComponent implements OnInit {
  constructor(private database: PouchDBService) {
    this.database.connect(PouchConfig.bucket, localStorage.getItem('channel'))
    // if (PouchConfig.canSync) {
    // NOTE: set to sync always atleast for now.
    this.database.sync([PouchConfig.syncUrl])
    // }
  }
  ngOnInit(): void {}
}
