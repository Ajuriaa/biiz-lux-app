import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ButtonsModule,
  HeaderModule
} from '../shared';
import {
  ExperiencesComponent,
  HomeComponent,
  AirportComponent,
  SpecialsComponent,
  ForgotSomethingComponent
} from './containers';
import { PassengersRoutingModule } from './passengers-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    ExperiencesComponent,
    AirportComponent,
    SpecialsComponent,
    ForgotSomethingComponent
  ],
  imports: [
    CommonModule,
    PassengersRoutingModule,
    HeaderModule,
    RouterModule,
    ButtonsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class PassengersModule { }
