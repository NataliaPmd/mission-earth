import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Project } from '../../models/project.model';

import { SearchsService } from '../../services/searchs.service';
import { ProjectsService } from '../../services/projects.service';
import { ModalImgService } from '../../services/modal-img.service';
  
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styles: [
  ]
})
export class ProjectsComponent implements OnInit, OnDestroy {
  public loading: boolean = true;
  public projects: Project[] = [];
  private imgSubs: Subscription;

  constructor(private projectService: ProjectsService,
               private modalImgService: ModalImgService,
               private searchsService: SearchsService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }
  ngOnInit(): void {
    this.loadProjects();

    this.imgSubs = this.imgSubs = this.modalImgService.newImg
      .pipe(delay(100))
      .subscribe( img => this.loadProjects() );
  }

  loadProjects() {
    this.loading = true;
    this.projectService.loadProjects()
      .subscribe( projects => {
        this.loading = false;
        this.projects = projects;
      });
  }

  search( termino: string ) {

    if ( termino.length === 0 ) {
      return this.loadProjects();
    }

    this.searchsService.search( 'projects', termino )
        .subscribe( (resp: any) => {
          this.projects = resp;
        });
  }

  abrirModal(project: Project) {

    this.modalImgService.openModal( 'projects', project._id, project.img );

  }

  deleteProject( project: Project ) {

    Swal.fire({
      title: '¿Borrar proyecto?',
      text: `Esta a punto de borrar ${ project.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.projectService.deleteProject( project._id )
          .subscribe( resp => {
            
            this.loadProjects();
            Swal.fire(
              'Proyecto borrado',
              `${ project.name } fue eliminado correctamente`,
              'success'
            );
            
          });

      }
    })

  }

}
