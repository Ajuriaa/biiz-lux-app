import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonsModule, HeaderModule } from '../shared';
import { PassengersRoutingModule } from './passengers-routing.module';
import {
  ExperiencesComponent,
  HomeComponent,
  SpecialsComponent
} from './containers';


@NgModule({
  declarations: [
    HomeComponent,
    ExperiencesComponent,
    SpecialsComponent
  ],
  imports: [
    CommonModule,
    PassengersRoutingModule,
    HeaderModule,
    RouterModule,
    ButtonsModule
  ]
})
export class PassengersModule { }
