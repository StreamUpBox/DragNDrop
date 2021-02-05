import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CreateProductComponent } from './create-product/create-product.component'
import { ProductsComponent } from './products/products.component'

const routes: Routes = [
  {
    path: 'library',
    component: ProductsComponent,
  },
  {
    path: 'product/add',
    component: CreateProductComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlipperInventoryRoutingModule {}
