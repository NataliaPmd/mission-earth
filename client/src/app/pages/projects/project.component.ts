import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Project } from '../../models/project.model';
import { Center } from '../../models/center.model';

import { CenterService } from '../../services/center.service';
import { ProjectsService } from '../../services/projects.service';
import { delay } from 'rxjs/operators';
import { ModalImgService } from '../../services/modal-img.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: []
})
export class ProjectComponent implements OnInit {
  public projectForm: FormGroup;
  public centers: Center[] = [];
  
  public projectSelected: Project;
  public centerSelected: Center;

  constructor(private fb: FormBuilder,
               private centerService: CenterService,
               private projectsService: ProjectsService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private modalImgService: ModalImgService,
               ) { }

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({ id }) => this.loadProject( id ) );

    this.projectForm = this.fb.group({
      name: ['', Validators.required ],
      center: ['', Validators.required ],
      subname: ['', Validators.required ],
      text: ['', Validators.required ],
    });

    this.loadCenters();

    this.projectForm.get('center').valueChanges
        .subscribe( centerId => {
          this.centerSelected = this.centers.find( h => h._id === centerId );
        })
  }
  loadProject(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }
    
     this.projectsService.getProjectById( id )
      .pipe(
        delay(100)
      )
      .subscribe( project => {

        if ( !project ) {
          return this.router.navigateByUrl(`/dashboard/projects`);
        }

        const { name, subname, text, center:{ _id } } = project; 
        this.projectSelected = project;
        this.projectForm.setValue({ name, subname, text, center:{ _id } });
      });

  }

  loadCenters() {

    this.centerService.loadCenters()
      .subscribe( (centers: Center[]) => {
        this.centers = centers;
      })

  }

  saveProject() {

    const { name } = this.projectForm.value;

    if ( this.projectSelected ) {
      // actualizar
      const data = {
        ...this.projectForm.value,
        _id: this.projectSelected._id
      }
      this.projectsService.updateProject( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ name } actualizado correctamente`, 'success');
        })

    } else {
      // crear
      
      this.projectsService.createProject( this.projectForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ name } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/projects`)
        })
    }
  }
}
