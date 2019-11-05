import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayComponent } from '../pay/pay/pay.component';
import { AuthGuard } from '../guards/auth-guard.service';

const payRoutes: Routes = [
    {
        path: '',
        component: PayComponent, canActivate: [AuthGuard],

        children: [
            {
                path: '',
                redirectTo: 'pay',
                pathMatch: 'full',
            },
            { path: 'pay', component: PayComponent }
      ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(payRoutes)],
    exports: [RouterModule]
})
export class PayRoutingModule {
}
