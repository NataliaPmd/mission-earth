import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styles: [
  ]
})
export class FavoritesComponent implements OnInit {

  constructor(private usersService: UsersService, private projectService: ProjectsService, private projectsService: ProjectsService) { }
  public projects: Project[];

  ngOnInit(): void {
    this.loadProjects()
  }

  loadProjects() {
    this.projectsService.getFavoriteProjects()
     .subscribe( projects => {
       this.projects = projects;
     });
 }

  favorite(project:Project) {
    const heartElement = ".heart" + project._id;
    $(".heart" + project._id).toggleClass('is_animating');
    $(".heart" + project._id).toggleClass('heart-fav');
    if($(".heart" + project._id).hasClass('heart-fav')) {
      if(!this.usersService.user.favs) {
        this.usersService.user.favs = [];
      }
      this.usersService.user.favs.push(project._id);
      this.addScore(project);
    }
    else {
      this.usersService.user.favs.splice(this.usersService.user.favs.indexOf(project._id),1)
      this.quitScore(project);
    }
    this.usersService.saveUser(this.usersService.user)
    .subscribe();
  }

  addScore(project: Project){
    const value = this.usersService.user.role === "USER_ROLE" ? 1 : 2;
    if(!project.score){
      project.score = 0;
    }
    project.score = +project.score + value;
    this.projectService.updateProject(project)
    .subscribe();
  }
  quitScore(project: Project){
    const value = this.usersService.user.role === "USER_ROLE" ? 1 : 2;
    if(!project.score){
      project.score = 0;
    }
    project.score = +project.score - value;
    this.projectService.updateProject(project)
    .subscribe();

  }

}
