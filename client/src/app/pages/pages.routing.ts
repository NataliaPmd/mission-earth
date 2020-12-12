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
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { CentersComponent } from './centers/centers.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './projects/project.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';
import { CenterPageComponent } from './center-page/center-page.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { TopComponent } from './top/top.component';
import { FavoritesComponent } from './favorites/favorites.component';

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
          { path: 'search/:termino', component: SearchComponent, data: {title: "Resultados de busqueda"} },
          { path: 'promises', component: PromisesComponent, data: {title: "promises"} },
          { path: 'rxjs', component: RxjsComponent, data: {title: "rxjs"} },
          { path: 'profile', component: ProfileComponent, data: {title: "Perfil de usuario"} },
          { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: {title: "Gestión de usuarios"} },
          { path: 'centers', canActivate: [AdminGuard], component: CentersComponent, data: {title: "Gestión de centros"} },
          { path: 'projects', component: ProjectsComponent, data: {title: "Gestión de proyectos"} },
          { path: 'project/:id', component: ProjectComponent, data: {title: "Gestión de proyectos"} },
          { path: 'center/:idCenter', component: CenterPageComponent, data: {title: "Página del centro"} },
          { path: 'center/:idCenter/:idProject', component: ProjectPageComponent, data: {title: "Página del Proyecto"} },
          { path: 'top', component: TopComponent, data: {title: "Top ten"} },
          { path: 'favorites', component: FavoritesComponent, data: {title: "Favoritos"} }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
