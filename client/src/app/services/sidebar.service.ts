import { Injectable } from '@angular/core';
import { ProfileComponent } from '../pages/profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [{
    title: "Dashboard",
    icon: "mdi mdi-gauge",
    childMenu: [
      {title: "Inicio", url: "/"},
      {title: "Barra de progreso", url: "progress"},
      {title: "Promesas", url: "promises"},
      {title: "Rxjs", url: "rxjs"},
      {title: "Perfil de usuario", url: 'profile' }
      


    ]
  },
  {
    title: "Admin panel",
    icon: "mdi mdi-folder-lock-open",
    childMenu: [
      {title: "Usuarios", url: "users"},
      {title: "Centros", url: "centers"},
      {title: "Proyectos", url: "projects"}
    ]
  }
];
  constructor() { }
}
