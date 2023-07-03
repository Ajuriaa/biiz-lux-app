import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonsModule, HeaderModule } from '../shared';
import { PassengersRoutingModule } from './passengers-routing.module';
import {
  ExperiencesComponent,
  HomeComponent,
  AirportComponent,
  SpecialsComponent
} from './containers';

@NgModule({
  declarations: [
    HomeComponent,
    ExperiencesComponent,
    AirportComponent,
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
