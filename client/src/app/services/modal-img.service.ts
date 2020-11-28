import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImgService {
  private _hideModal: Boolean = true;
  public tipo: "usuarios" | "centers" | "projects";
  public id: string;
  public img: string;
  public newImg: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  get hideModal() {
    return this._hideModal;
  }
  openModal(tipo : "usuarios" | "centers" | "projects", id: string, img: string = 'no-img') {
    this._hideModal = false;
    this.tipo = tipo;
    this.id = id;
    if(img.includes("https")){
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`
    }
    console.log(this._hideModal);
    console.log(tipo);
    console.log(img);
  }
  closeModal() {
    this._hideModal = true;
  }
}
