import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ProductsComponent } from '@enexus/flipper-inventory'
import { CreateProductComponent } from '@enexus/flipper-inventory'

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },

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
