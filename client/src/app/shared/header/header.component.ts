import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private usersService: UsersService, private route: Router) {
    this.user = this.usersService.user;
   }

  ngOnInit(): void {
  }
  logout() {
    this.usersService.logout();
  }
  search(termino: string) {
    if(termino.length === 0 ) {
      this.route.navigateByUrl('/dashboard');
    }
    this.route.navigateByUrl('/dashboard/search/' + termino);
  }
}
