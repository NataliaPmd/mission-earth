import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import {tap, map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public auth2: any;
  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
   }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
     return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp:any) => {
        localStorage.setItem('token', resp.token)
      }),
      map(resp => true),
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
