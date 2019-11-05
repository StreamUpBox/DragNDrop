import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ItemCategoriesComponent } from './pos/load-item/item-categories/item-categories.component';
import { PosProductsComponent } from './pos/load-item/pos-products/pos-products.component';
import { AuthGuard } from '../importables/guards/auth-guard.service';

const posRoutes: Routes = [
  {
    path: '',
    redirectTo: 'till-categories',
    pathMatch: 'full',
    },
    {
      path: 'till-categories',component:ItemCategoriesComponent,
    },
    {
      path: 'till-category-items/:categoryId', component: PosProductsComponent
    },

    // {
    // path: 'till-orders',
    // loadChildren: ()=> {
    //   return null //import('./../importables/orders/orders.module').then(m => m.OrdersModule);
    // },
    // canActivate: [AuthGuard]
    // },
    // {
    //   path: 'till-customers',
    //   loadChildren: ()=> {
    //     return import('./../importables/customers/customers.module').then(m => m.CustomersModule);
    //   },
    //   canActivate: [AuthGuard]
    // },
    // {
    //   path: 'till-pay',
    //   loadChildren: ()=> {
    //     return import('./../importables/pay/pay.module').then(m => m.PayModule);
    //   },
    //   canActivate: [AuthGuard]
    // }

];

@NgModule({
    imports: [RouterModule.forChild(posRoutes)],
    exports: [RouterModule]
})
export class PosRoutingModule {
}
