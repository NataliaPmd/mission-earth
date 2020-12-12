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
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: []
})
export class ProjectComponent implements OnInit {
  public projectForm: FormGroup;
  public centers: Center[] = [];
  public user: User;
  
  public projectSelected: Project;
  public centerSelected: Center;

  constructor(private fb: FormBuilder,
               private centerService: CenterService,
               private projectsService: ProjectsService,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               private modalImgService: ModalImgService,
               private usersService: UsersService
               ) { }

  ngOnInit(): void {
    this.user = this.usersService.user;

    this.activatedRoute.params
        .subscribe( ({ id }) => this.loadProject( id ) );

    this.projectForm = this.fb.group({
      name: ['', Validators.required ],
      subname: ['', Validators.required ],
      text: ['', Validators.required ],
      center: [this.user.center._id || '', Validators.required ],
    });
    if(this.user.role !== "ADMIN_ROLE") {
      this.centerSelected = this.user.center;
      this.projectForm.controls.center.setValue(this.user.center._id);
    }
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
        this.projectSelected = project;
        const centerId = project.center._id;
        const name = project.name;
        const subname = project.subname;
        const text = project.text;
        this.projectForm.setValue({ "name": name, "subname":subname, "text":text, "center": centerId});
        this.centerSelected = project.center;

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
