import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Project } from '../models/project.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

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


  loadProjects() {

    const url = `${ base_url }/projects`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, projects: Project[] }) => resp.projects )
              );
  }

  getProjectById( id: string ) {

    const url = `${ base_url }/projects/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, project: Project }) => resp.project )
              );
  }

  getProjectsByCenter() {
    const url = `${ base_url }/projects/byCenter`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, projects: any[] }) => resp.projects )
              );
  }

  getTopProjects() {
    const url = `${ base_url }/projects/top`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, projects: any[] }) => resp.projects )
              );
  }

  getFavoriteProjects() {
    const url = `${ base_url }/projects/favorites`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, projects: any[] }) => resp.projects )
              );
  }

  createProject( project: { name: string, center: string } ) {

    const url = `${ base_url }/projects`;
    return this.http.post( url, project, this.headers );
  }
  
  updateProject( project: Project  ) {
    const url = `${ base_url }/projects/${ project._id }`;
    return this.http.put( url, project, this.headers );
  }

  deleteProject( _id: string ) {

    const url = `${ base_url }/projects/${ _id }`;
    return this.http.delete( url, this.headers );
  }
}
