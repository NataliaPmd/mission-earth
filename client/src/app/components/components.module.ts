import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoosterComponent } from './booster/booster.component';
import { FormsModule } from '@angular/forms';
import { ModalImgComponent } from './modal-img/modal-img.component';



@NgModule({
  declarations: [BoosterComponent, ModalImgComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BoosterComponent,
    ModalImgComponent
  ]
})
export class ComponentsModule { }
