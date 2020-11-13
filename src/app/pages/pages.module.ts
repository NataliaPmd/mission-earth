import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';


import { PagesComponent } from './pages.component';
import { RxjsComponent } from './rxjs/rxjs.component';


@NgModule({
  declarations: [
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
  ],
  exports: [
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule { }
