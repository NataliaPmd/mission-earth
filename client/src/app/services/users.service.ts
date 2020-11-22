import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import {tap, map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public auth2: any;
  public user: User; 
  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
   }

   get token() {
     return localStorage.getItem('token') || '';
   }
   get uid() {
    return this.user.uid || '';
  }
  validateToken(): Observable<boolean> {
    const token = this.token;
     return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((resp:any) => {
        const {nombre, email, password, img = '', google, role, uid} = resp.user;
        this.user = new User(nombre, email, '', img, google, role, uid )
        localStorage.setItem('token', resp.token)
        return true;
      }),
      catchError(err => of(false))
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token)
      })
    )
  }
  updateUser(data: {email:string, name:string, role:string}) {
    data = {
      ...data,
      role: this.user.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    })
  }
  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap((response: any) => {
                    localStorage.setItem('token', response.token)
                  })
                )
  }
  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }
  googleInit() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '200538079333-pr75i7k4obaor8loo6gmakuotdkmv72s.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
    });
  }
  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, {token})
                .pipe(
                  tap((response: any) => {
                    localStorage.setItem('token', response.token)
                  })
                )
  }
}
