import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string , tipo = "usuarios| centers | projects"): string {
    if(img) {
      if(img.includes('https')) {
          return img;
      }
      return `${base_url}/upload/${tipo}/${img}`;
      } else {
          return `${base_url}/upload/usuarios/no-image`;
      }
   }

}
