import {Component, ViewEncapsulation, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { Bootstrapper } from '../../bootstrapper.service';
import { DOCUMENT } from '@angular/common';
import { CurrentUser } from '../../auth/current-user';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'logged-in-user-widget',
    templateUrl: './logged-in-user-widget.component.html',
    styleUrls: ['./logged-in-user-widget.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoggedInUserWidgetComponent  {
  loading:boolean=false;
  ipcRenderer: any;
    constructor(private bootstrapper: Bootstrapper,
      private router: Router, public currentUser: CurrentUser, public auth: AuthService) {
       
      }
    

    logOut(){
    this.loading=true;
    this.auth.logOut().subscribe(
      response =>  {
      this.loading=false;
      this.currentUser.clear();
      this.bootstrapper.bootstrap(response.data);
      this.router.navigate(["/login"]);
    });
  }
  isElectron = () => {
    return false; //window && window.process && window.process.type;
  };
  public openAccountSettings() {
       window.location.href="https://yegobox.com/account/settings";
    
  }
}
