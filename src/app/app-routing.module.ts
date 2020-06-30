import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductsComponent } from '@enexus/flipper-inventory';
import { CreateProductComponent } from '@enexus/flipper-inventory';



const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'admin/pos', component: AppComponent},
   {path: 'admin/analytics', component: AppComponent},
  {path: 'admin/settings', component: AppComponent},
  {path: 'admin/inventory', component: ProductsComponent},
  {
    path: 'add/product', component: CreateProductComponent
  },
  // {
  //   path: 'setup/business/new', component: CreateUpdateBusinessComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
