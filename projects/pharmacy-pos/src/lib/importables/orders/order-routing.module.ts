import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuard } from '../guards/auth-guard.service';
import { OrderOrderedComponent } from './order-ordered/order-ordered.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { OrderHeldComponent } from './order-held/order-held.component';

const orderRoutes: Routes = [
    {
        path: '',
        component: OrdersComponent, canActivate: [AuthGuard],

        children: [
            {
                path: '',
                redirectTo: 'order-pending',
                pathMatch: 'full',
            },
            { path: 'order-pending', component: OrderOrderedComponent },
            { path: 'order-complete', component: OrderCompleteComponent },
            { path: 'order-held', component: OrderHeldComponent },

      ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(orderRoutes)],
    exports: [RouterModule]
})
export class OrderRoutingModule {
}
