import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchsService } from '../../services/searchs.service';

import { Center } from 'src/app/models/center.model';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  public projects: Project[] = [];
  public centers: Center[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private searchsService: SearchsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({termino}) => {
      this.globalSearch( termino )
    })
  }

  globalSearch( termino: string ) {

    this.searchsService.globalSearch( termino )
        .subscribe( (resp: any) => {
          this.projects   = resp.projects;
          this.centers = resp.centers;
        });

  }


}
