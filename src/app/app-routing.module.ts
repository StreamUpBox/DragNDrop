import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { ProductsComponent } from '@enexus/flipper-inventory'
import { CreateProductComponent } from '@enexus/flipper-inventory'
import { CreateUpdateBusinessComponent } from '@enexus/flipper-settings'

const routes: Routes = [
  { path: 'index', component: AppComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'admin', component: AppComponent },
  { path: 'admin/pos', component: AppComponent },
  { path: 'admin/analytics', component: AppComponent },
  { path: 'admin/settings', component: AppComponent },
  { path: 'admin/inventory', component: ProductsComponent },
  {
    path: 'add/product',
    component: CreateProductComponent,
  },
  {
    // path: 'setup/business/new',
    // for testing the inventory please comment the line below
    // component: CreateUpdateBusinessComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
