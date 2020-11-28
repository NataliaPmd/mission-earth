import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Center } from '../models/center.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchsService {
  public user: User; 
  public center: Center; 
  constructor(private http: HttpClient) { 
    
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
  search(tipo: 'usuarios' | 'medicos' | 'centers', termino: string) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          switch (tipo) {
            case "usuarios":
              return this.transformUser(resp.resultados)
              break;
            case "centers":
              return this.transformCenter(resp.resultados)
              break;
          
            default:
              break;
          }
        }
          
        )
      )
     
  }
  private transformUser(results: any []): User[] {
    return results.map(
      user => new User(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    )
  }
  private transformCenter(results: any []): Center[] {
    return results.map(
      center => new Center(center.name, center._id, center.img, center.usuario)
    )
  }
}
