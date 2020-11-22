import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public user: User;
  constructor(private usersService: UsersService) {
    this.user = this.usersService.user;
   }

  ngOnInit(): void {
  }
  logout() {
    this.usersService.logout();
  }
}
