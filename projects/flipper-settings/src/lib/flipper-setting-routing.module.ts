
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateUpdateBusinessComponent } from './business/create-update-business/create-update-business.component';
import { BusinessComponent } from './business/view/business.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'business/new',
    pathMatch: 'full'
  },
  {
    path: 'business/all',
    component: BusinessComponent
  },
  {
    path: 'business/new',
    component: CreateUpdateBusinessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class FlipperSettingsRoutingModule { }
