import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customer/customer.component';
import { AuthGuard } from '../guards/auth-guard.service';

const customerRoutes: Routes = [
    {
        path: '',
        component: CustomersComponent, canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'cust-lists',
                pathMatch: 'full',
            },
            { path: 'cust-lists', component: CustomersComponent },
      ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(customerRoutes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule {
}
