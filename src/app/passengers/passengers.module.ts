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
  UserInfoComponent,
  TripComponent
} from './containers';
import { PassengersRoutingModule } from './passengers-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    PassengerRouterComponent,
    HomeComponent,
    ExperiencesComponent,
    AirportComponent,
    SpecialsComponent,
    ForgotSomethingComponent,
    AccidentComponent,
    UserInfoComponent,
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
    MapsModule,
    IonicModule
  ]
})
export class PassengersModule { }
