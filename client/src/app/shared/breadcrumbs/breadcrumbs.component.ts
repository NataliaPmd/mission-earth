import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public title: string;
  public titleSubs$: Subscription;

  
  constructor( private router: Router, private route: ActivatedRoute, private _location: Location ) {

    this.titleSubs$ = this.getArgumentosRuta()
                        .subscribe( ({ title }) => {
                            this.title = title;
                            document.title = `MissionEarth - ${ title }`;
                        });
  }
  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }


  getArgumentosRuta() {

    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null  ),
        map( (event: ActivationEnd) => event.snapshot.data ),
      );
  }
  back() {
    this._location.back();
  }

}
