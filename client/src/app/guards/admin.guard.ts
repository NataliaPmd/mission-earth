import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private usersService: UsersService,
               private router: Router ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
      if (this.usersService.user.role === 'ADMIN_ROLE' || this.usersService.user.role === 'MODERATOR_ROLE') {
        return true;
      } else {
        this.router.navigateByUrl('/dashboard');
        return false;
      }

      // return (this.usuarioService.role === 'ADMIN_ROLE') ? true : false;

  }
  
}
