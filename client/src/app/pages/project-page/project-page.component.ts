import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Project } from 'src/app/models/project.model';
import { ProjectsService } from 'src/app/services/projects.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styles: [
  ]
})
export class ProjectPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private projectsService: ProjectsService, private domSanitizer: DomSanitizer) { }

  public project: Project;
  public text: SafeHtml;
  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({ idProject }) => {
          console.log(idProject)
          this.loadProject( idProject ) 
        });
  }
  loadProject(id: string) {
     this.projectsService.getProjectById( id )
      .subscribe( project => {
        this.project = project;
        this.text = this.domSanitizer.bypassSecurityTrustHtml(this.project.text)
      });
  }
}
