import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    { 
        path: 'dashboard',
        component: PagesComponent ,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, data: {title: "Dashboard"} },
          { path: 'progress', component: ProgressComponent, data: {title: "progress"} },
          { path: 'grafica1', component: Grafica1Component, data: {title: "grafica"} },
          { path: 'account-settings', component: AccountSettingsComponent, data: {title: "account settings"} },
          { path: 'promises', component: PromisesComponent, data: {title: "promises"} },
          { path: 'rxjs', component: RxjsComponent, data: {title: "rxjs"} }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
