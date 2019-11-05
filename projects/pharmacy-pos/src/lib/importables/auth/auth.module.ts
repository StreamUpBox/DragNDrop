import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth.routing";
import { LoginComponent } from "./login/login.component";

import { RequestExtraCredentialsModalComponent } from "./request-extra-credentials-modal/request-extra-credentials-modal.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { ChangePasswordComponent } from "./reset-password/change-password/change-password.component";
import { EmailVerifyComponent } from "./login/email-verify/email-verify.component";
import { PasswordVerifyComponent } from "./login/password-verify/password-verify.component";
import { UiModule } from '../ui/ui.module';
import { MaterialModule } from '../material/material.module';
import { GlobalVariables } from '../global-variables';

@NgModule({
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    RouterModule,
    LoginComponent,
    EmailVerifyComponent,
    PasswordVerifyComponent,
    ChangePasswordComponent
  ],
  declarations: [
    LoginComponent,
    EmailVerifyComponent,
    PasswordVerifyComponent,
    ChangePasswordComponent,
    RequestExtraCredentialsModalComponent
  ],
  entryComponents: [RequestExtraCredentialsModalComponent]
})
export class AuthModule {
  constructor(public g: GlobalVariables) {
   this.g.checkInternet();
  }
 
}
