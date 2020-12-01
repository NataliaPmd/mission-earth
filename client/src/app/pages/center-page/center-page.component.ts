import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Center } from 'src/app/models/center.model';
import { Project } from 'src/app/models/project.model';
import { CenterService } from 'src/app/services/center.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';
declare var $: any;

@Component({
  selector: 'app-center-page',
  templateUrl: './center-page.component.html',
  styles: [
  ]
})
export class CenterPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private centerService: CenterService,
    private usersService: UsersService, private projectService: ProjectsService) { }
  public center: Center;
  public projects: Project[];

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( ({ idCenter }) => this.loadCenter( idCenter ) );
  }

  loadCenter(id) {
    this.centerService.getProjects(id).
    subscribe((resp: any) => {
      this.center = resp.center;
      this.projects = resp.projects;
      this.projects.forEach(project => {
          if(this.usersService.user.favs && this.usersService.user.favs.indexOf(project._id.toString()) !== -1){
            setTimeout(function() {
              $(".heart" + project._id).addClass('heart-fav');
              $(".heart" + project._id).addClass('is_animating');
            },100);
          }
      })
    })
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
