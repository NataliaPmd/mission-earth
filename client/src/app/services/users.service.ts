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
   get headers(){
     return {
      headers: {
        'x-token': this.token
      }
     }
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
        const {nombre, email, password, img = '', google, role, uid, favs} = resp.user;
        this.user = new User(nombre, email, '', img, google, role, uid, favs)
        localStorage.setItem('token', resp.token);
        localStorage.setItem('menu', JSON.stringify(resp.menu))
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
        localStorage.setItem('menu', JSON.stringify(response.menu))
      })
    )
  }
  updateUser(data: {email:string, name:string, role:string}) {
    var data = {
      ...data,
      role: this.user.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers)
  }
  saveUser(user: User) {
    console.log("saveUser");
    console.log(user);
    return this.http.put(`${base_url}/usuarios/${user.uid}`, user, this.headers)
  }
  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap((response: any) => {
                    localStorage.setItem('token', response.token)
                    localStorage.setItem('menu', JSON.stringify(response.menu))
                  })
                )
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
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
                    localStorage.setItem('menu', JSON.stringify(response.menu))
                  })
                )
  }
  listUsers(init: number=0) {
    const url = `${base_url}/usuarios?desde=${init}`
    return this.http.get<{total: number, usuarios:User[]}>(url, this.headers)
      .pipe(
        map(resp => {
          const users = resp.usuarios.map(
            user => new User(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
          )
          return {
            total: resp.total,
            usuarios: users}
        })
      )
  }
  delete(user: User) {
    const url = `${base_url}/usuarios/${user.uid}`
    return this.http.delete(url, this.headers)
  }
}
