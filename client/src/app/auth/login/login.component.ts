import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit{
  public auth2: any;
  constructor(private router: Router, private fb: FormBuilder, private usersService: UsersService, private ngZone: NgZone) { }
  ngOnInit(): void {
    this.renderButton();  
  }
  public formSubmmited = false; 
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember:[false]
  })
  
  login() {
    this.usersService.login(this.loginForm.value)
    .subscribe(response => {
      if(this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value)
      }
      else {
        localStorage.removeItem('email');

      }
      this.router.navigateByUrl('');

    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error')
    })
  }
    renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark'
      });
      this.startApp();
    }
    startApp = function() {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '200538079333-pr75i7k4obaor8loo6gmakuotdkmv72s.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        this.attachSignin(document.getElementById('my-signin2'))
      });
    };
    attachSignin(element) {
      this.auth2.attachClickHandler(element, {},
          (googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token;
            this.usersService.loginGoogle(id_token).subscribe(resp => {
              this.ngZone.run(() => { // para que angular no pierda el ciclo de vida
                this.router.navigateByUrl('')
                
              })
            }
            );
          }, function(error) {
            alert(JSON.stringify(error, undefined, 2));
          });
    }
}
