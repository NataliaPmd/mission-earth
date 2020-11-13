import { Injectable } from '@angular/core';

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
    ]
  }];
  constructor() { }
}
