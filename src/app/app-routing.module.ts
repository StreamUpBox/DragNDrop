import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsComponent } from '@enexus/flipper-inventory';


const routes: Routes = [
  {path: 'order', component: AppComponent},
  {path: 'settings', component: AppComponent},
  {path: 'analytics', component: AppComponent},
  {path: 'inventory-count', component: AppComponent},
  {path: 'items/library', component: ProductsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
