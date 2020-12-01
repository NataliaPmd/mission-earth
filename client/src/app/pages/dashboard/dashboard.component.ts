import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  public loading: boolean = true;
  public projects: any;
  public user: User;

  constructor(private projectService: ProjectsService, public usersService: UsersService) { }

  ngOnInit(): void {
    this.loadProjectsByCenter();
  }

  loadProjectsByCenter() {
    this.loading = true;
    this.projectService.getProjectsByCenter()
      .subscribe( projects => {
        this.loading = false;
        this.projects = projects;
          this.projects.forEach(project => {
            project.projects.forEach(project_ => {
              if(this.usersService.user.favs && this.usersService.user.favs.indexOf(project_._id.toString()) !== -1){
                setTimeout(function() {
                  $(".heart" + project_._id).addClass('heart-fav');
                  $(".heart" + project_._id).addClass('is_animating');
                },100);
              }
            })
          })
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
