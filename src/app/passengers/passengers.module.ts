import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ButtonsModule,
  HeaderModule,
  MapsModule
} from '../shared';
import { MaterialModule } from '../material';
import {
  ExperiencesComponent,
  HomeComponent,
  AirportComponent,
  SpecialsComponent,
  ForgotSomethingComponent,
  AccidentComponent,
  PassengerRouterComponent,
  TripComponent
} from './containers';
import { PassengersRoutingModule } from './passengers-routing.module';

@NgModule({
  declarations: [
    PassengerRouterComponent,
    HomeComponent,
    ExperiencesComponent,
    AirportComponent,
    SpecialsComponent,
    ForgotSomethingComponent,
    AccidentComponent,
    TripComponent
  ],
  imports: [
    CommonModule,
    PassengersRoutingModule,
    HeaderModule,
    RouterModule,
    ButtonsModule,
    ReactiveFormsModule,
    MaterialModule,
    MapsModule
  ]
})
export class PassengersModule { }
