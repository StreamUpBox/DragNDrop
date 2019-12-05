import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: 'order', component: AppComponent},
  {path: 'settings', component: AppComponent},
  {path: 'analytics', component: AppComponent},
  {path: 'inventory-count', component: AppComponent},
  {path: 'inventory', component: AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
