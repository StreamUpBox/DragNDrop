import { NgModule } from '@angular/core';
import { YegoboxLoginComponent } from './yegobox-login.component';
// import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [YegoboxLoginComponent],
  imports: [
    // AuthModule
  ],
  exports: [YegoboxLoginComponent]
})
export class YegoboxLoginModule { }
