import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styles: [
  ]
})
export class TopComponent implements OnInit {
  public projects: Project[] = [];

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectsService.getTopProjects()
     .subscribe( projects => {
       this.projects = projects;
     });
 }
}
