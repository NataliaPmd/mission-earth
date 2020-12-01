import { Component, OnInit } from '@angular/core';
import { Center } from 'src/app/models/center.model';
import { User } from 'src/app/models/user.model';
import { CenterService } from 'src/app/services/center.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {
  public totalUsers: number=0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public init:number = 0;
  public loading: boolean = true;
  public centers: Center[] = [];

  constructor(private userService: UsersService, private searchsService: SearchsService, private centerService: CenterService) { }

  ngOnInit(): void {
    this.chargeUsers();
    this.loadCenters();
  }  

  changePage(valor: number) { 
    this.init += valor;
    if(this.init < 0){
      this.init = 0;
    }
    else if(this.init > this.totalUsers){
      this.init -= valor;
    }
    this.chargeUsers();
  }
  chargeUsers() {
    this.loading= true;
    this.userService.listUsers(this.init)
    .subscribe(({total, usuarios})=> {
      if(usuarios.length !== 0){
        this.users = usuarios;
        this.usersTemp = usuarios;
      }
      this.totalUsers = total;
      this.loading= false;
    })
  }
  search(termino: string) {
    if(termino.length === 0) {
      this.users = this.usersTemp;
    }
    this.searchsService.search("usuarios", termino)
      .subscribe((resp: any) =>
        this.users = resp
      )
  }
  delete(user: User) {
    if(user.uid === this.userService.uid) {
      return Swal.fire(
        'Error',
        'No puedes eliminarte a ti mismo',
        'error'
      )
    }
    Swal.fire({
      title: 'Eliminar usuario',
      text: "¿Estas seguro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if(result.value) {
        this.userService.delete(user)
        .subscribe(() => {
          Swal.fire(
            'Usuario eliminado',
            'El usuario ha sido eliminado',
            'success'
          )
          this.chargeUsers();
        })
      }
    })
  }
  changeRole(user: User) {
    this.userService.saveUser(user)
    .subscribe(resp => {
      
    })
  }

  changeCenter(user: User) {
    this.userService.saveUser(user)
    .subscribe(resp => {
      
    })
  }

  loadCenters() {

    this.centerService.loadCenters()
      .subscribe( (centers: Center[]) => {
        this.centers = centers;
      })

  }
}
