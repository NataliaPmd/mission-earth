import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent{

  public formSubmmited = false; 
  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required],
  },{
    validators: this.equalPasswords('password', 'password2')
  } )
  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router) { }

  createUser() {
    console.log(this.registerForm.value)
    this.formSubmmited = true; 
    if(this.registerForm.invalid) {
      return
    }
    this.usersService.createUser(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('')
    }, (err)=>
    {
      Swal.fire('Error', err.error.msg, 'error')
    });

  }
  notValidField(field: string): boolean{
    if(this.registerForm.get(field).invalid && this.formSubmmited){
      return true;
    }
    else{
      return false;
    }
  }
  checkTerms() {
    return !this.registerForm.get("terminos").value && this.formSubmmited
  }
  notValidPass(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if(pass1 !== pass2 && this.formSubmmited){
      return true
    }else{
      return false
    }
  }
  equalPasswords(pass1Name: string, pass2Name: string) {
    //needs return a function
    return (formGroup: FormGroup) =>{
      const pass1Control = formGroup.get(pass1Name)
      const pass2Control = formGroup.get(pass2Name)
      if(pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      }else {
        pass2Control.setErrors({notEqual: true})
      }
    }
  }
} 
