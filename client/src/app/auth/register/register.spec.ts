import { RegisterComponent } from "./register.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';


describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let userService: UsersService;
    let router: Router;
    beforeEach(() => {
        component = new RegisterComponent(new FormBuilder(), userService, router);
    })
    it('should form fields exist', () => {
        expect(component.registerForm.contains('email')).toBeTruthy();
        expect(component.registerForm.contains('nombre')).toBeTruthy();
        expect(component.registerForm.contains('terminos')).toBeTruthy();
        expect(component.registerForm.contains('password')).toBeTruthy();
        expect(component.registerForm.contains('password2')).toBeTruthy();
      });

      it('email required', () => {
          const email = component.registerForm.get('email');
          email.setValue('');
          expect (email.valid).toBeFalsy();
      });
      
      it('email valid', () => {
        const email = component.registerForm.get('email');
        email.setValue('natalia.pmd');
        expect (email.valid).toBeFalsy();
        email.setValue('natalia.pmd@gmail.com');
        expect (email.valid).toBeTruthy();
    });
})