import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Center } from '../../models/center.model';

import { SearchsService } from '../../services/searchs.service';
import { CenterService } from '../../services/center.service';
import { ModalImgService } from '../../services/modal-img.service';
@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styles: [
  ]
})
export class CentersComponent implements OnInit {
  public centers: Center[] = [];
  public loading: boolean = true;
  private imgSubs: Subscription;

  constructor(private centerService: CenterService,
    private modalImagenService: ModalImgService,
    private searchsService: SearchsService) { 
    
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadCenters();

    this.imgSubs = this.imgSubs = this.modalImagenService.newImg
      .pipe(delay(100))
      .subscribe( img => this.loadCenters() );
  }
  search( termino: string ) {

    if ( termino.length === 0 ) {
      return this.loadCenters();
    }

    this.searchsService.search( 'centers', termino )
        .subscribe( (resp: any) => {

          this.centers = resp;

        });
  }

  loadCenters() {

    this.loading = true;
    this.centerService.loadCenters()
        .subscribe( centers => {
          this.loading = false;
          this.centers= centers;
        })

  }

  saveChanges( center: Center ) {

    this.centerService.updateCenter( center._id, center.name)
        .subscribe( resp => {
          Swal.fire( 'Actualizado', center.name, 'success' );
        });

  }

  deleteCenter( center: Center ) {

    this.centerService.deleteCenter( center._id )
        .subscribe( resp => {
          this.loadCenters();
          Swal.fire( 'Borrado', center.name, 'success' );
        });

  }

  async openSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear centro',
      text: 'Ingrese el nombre del nuevo centro',
      input: 'text',
      inputPlaceholder: 'Nombre del centro',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      this.centerService.createCenter( value )
        .subscribe( (resp: any) => {
          this.centers.push( resp.center )
        })
    }
  }

  openModal(center: Center) {

    this.modalImagenService.openModal( 'centers', center._id, center.img );

  }
}
