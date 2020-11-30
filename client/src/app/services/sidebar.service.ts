import { Injectable } from '@angular/core';
import { ProfileComponent } from '../pages/profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu = [];
  loadMenu() {
    this.menu = JSON.parse(localStorage.getItem("menu")) || [];
  }
  constructor() { }
}
