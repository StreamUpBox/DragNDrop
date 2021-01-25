import { Component, OnInit, OnDestroy } from '@angular/core'
import { PouchDBService } from '@enexus/flipper-components'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit, OnDestroy {
  userToggledMenu: any

  constructor(private database: PouchDBService) {}

  ngOnDestroy() {}

  async ngOnInit() {
    // await this.currentUser.user()
  }
  isMenuToggled(event) {
    this.userToggledMenu = event
  }

  displaySwitchedBranch(event) {}

  async didUserLoggedOut(event) {
    // await this.currentUser.user()
    // if (this.currentUser.currentUser) {
    //   this.currentUser.currentUser.active = false
    //   await this.database.put(this.currentUser.currentUser.id, this.currentUser.currentUser)
    // }
    // window.localStorage.setItem('channel', this.currentUser.currentUser.id)
    // return (window.location.href = '/login')
  }
}
