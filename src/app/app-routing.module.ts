import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProductsComponent } from '@enexus/flipper-inventory'
import { CreateProductComponent } from '@enexus/flipper-inventory'
import { CreateUpdateBusinessComponent } from '@enexus/flipper-settings'

const routes: Routes = [
  { path: 'index', component: ProductsComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },

  { path: 'admin/inventory', component: ProductsComponent },
  {
    path: 'add/product',
    component: CreateProductComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
