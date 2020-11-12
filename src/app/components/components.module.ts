import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoosterComponent } from './booster/booster.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [BoosterComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BoosterComponent
  ]
})
export class ComponentsModule { }
