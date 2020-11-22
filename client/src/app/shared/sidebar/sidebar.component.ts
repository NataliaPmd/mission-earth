import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  public user: User;
  menuItems: any[];
  constructor(private sidebarService: SidebarService, private userService: UsersService) {
    this.menuItems = sidebarService.menu;
    this.user = this.userService.user;
   }

  ngOnInit(): void {
  }

}
