import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ButtonsModule,
  HeaderModule,
  CalendarModule
} from '../shared';
import {
  ExperiencesComponent,
  HomeComponent,
  AirportComponent,
  SpecialsComponent
} from './containers';
import { PassengersRoutingModule } from './passengers-routing.module';

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
    ButtonsModule,
    CalendarModule
  ]
})
export class PassengersModule { }
