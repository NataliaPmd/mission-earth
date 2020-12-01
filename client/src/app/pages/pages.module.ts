import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'

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
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { CentersComponent } from './centers/centers.component';
import { ProjectsComponent } from './projects/projects.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProjectComponent } from './projects/project.component';
import { SearchComponent } from './search/search.component';
import { CenterPageComponent } from './center-page/center-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';

@NgModule({
  declarations: [
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    CentersComponent,
    ProjectsComponent,
    ProjectComponent,
    SearchComponent,
    CenterPageComponent,
    ProjectPageComponent,
  ],
  exports: [
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    QuillModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule,
    QuillModule.forRoot()
  ]
})
export class PagesModule { }
