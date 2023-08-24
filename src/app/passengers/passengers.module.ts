import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  ButtonsModule,
  HeaderModule,
  MapsModule,
  ToasterModule
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
  TripComponent,
  CancelTripComponent
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
    UserInfoComponent,
    TripComponent,
    CancelTripComponent
  ],
  imports: [
    CommonModule,
    PassengersRoutingModule,
    HeaderModule,
    RouterModule,
    ButtonsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    MapsModule,
    ToasterModule,
    IonicModule
  ]
})
export class PassengersModule { }
