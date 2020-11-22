import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public user: User;
  public uploadImg: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder, private userService: UsersService, private fileUploadService: FileUploadService) { 
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [this.user.nombre, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    })
  }

  updateProfile() {
    this.userService.updateUser(this.profileForm.value)
      .subscribe(resp => {
        this.user.nombre = this.profileForm.value.nombre;
        this.user.email = this.profileForm.value.email;
        Swal.fire('Guardado', 'Cambios guardados', 'success')  
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')  
      });

  }
  changeImg(file: File) {
    this.uploadImg = file;
    if(!file) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp= reader.result;

    } 
  }
  updateImg() {
    this.fileUploadService.updateImg(this.uploadImg, "usuarios", this.user.uid )
    .then(img => {
      this.user.img = img
      Swal.fire('Guardado', 'Cambios guardados', 'success')  
    })
    .catch(err => {
      console.log(err);
      Swal.fire('Error', 'no se pudo guardar la imagen', 'error')  
    })
  }
}
