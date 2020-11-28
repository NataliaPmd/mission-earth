import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImgService } from 'src/app/services/modal-img.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styles: [
  ]
})
export class ModalImgComponent implements OnInit {

  public uploadImg: File;
  public imgTemp: any = null;

  constructor(public modalImgService: ModalImgService, public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.imgTemp = null;
    this.modalImgService.closeModal();
  }

  changeImg(file: File) {
    this.uploadImg = file;
    if(!file) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp= reader.result;

    } 
  }
  uploadImage() {
    const id = this.modalImgService.id; 
    const tipo = this.modalImgService.tipo;    
   
    this.fileUploadService
      .updateImg( this.uploadImg, tipo, id)
      .then( img => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        this.modalImgService.newImg.emit(img)
        this.closeModal();
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }
}
