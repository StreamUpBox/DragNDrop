import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProductsComponent } from '@enexus/flipper-inventory'
import { CreateProductComponent } from '@enexus/flipper-inventory'
// import { FlipperPosComponent } from '@enexus/flipper-pos/lib/flipper-pos.component'
import { CreateUpdateBusinessComponent } from '@enexus/flipper-settings'
// import { FlipperPosComponent } from './app.component'
import { FlipperPosComponent } from 'projects/flipper-pos/src/lib/flipper-pos.component'

const routes: Routes = [
  { path: 'index', component: FlipperPosComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'admin', component: FlipperPosComponent },
  { path: 'admin/pos', component: FlipperPosComponent },
  { path: 'admin/analytics', component: FlipperPosComponent },
  { path: 'admin/settings', component: FlipperPosComponent },
  { path: 'admin/inventory', component: ProductsComponent },
  {
    path: 'add/product',
    component: CreateProductComponent,
  },
  {
    path: 'setup/business/new',
    component: CreateUpdateBusinessComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
