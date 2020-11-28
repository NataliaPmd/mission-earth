import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Center } from '../models/center.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  constructor(private http: HttpClient) { }
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loadCenters() {

    const url = `${ base_url }/centers`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, centers: Center[] }) => resp.centers )
              );
  }

  createCenter( name: string ) {

    const url = `${ base_url }/centers`;
    return this.http.post( url, { name }, this.headers );
  }
  
  updateCenter( _id: string, name: string  ) {

    const url = `${ base_url }/centers/${ _id }`;
    return this.http.put( url, { name }, this.headers );
  }

  deleteCenter( _id: string ) {

    const url = `${ base_url }/centers/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
