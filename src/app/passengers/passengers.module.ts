import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ButtonsModule, HeaderModule } from '../shared';
import { HomeComponent } from './containers/home/home.component';
import { PassengersRoutingModule } from './passengers-routing.module';
import { ExperiencesComponent } from './containers';
import { AirportComponent } from './containers/airport/airport.component';

@NgModule({
  declarations: [
    HomeComponent,
    ExperiencesComponent,
    AirportComponent
  ],
  imports: [
    CommonModule,
    PassengersRoutingModule,
    HeaderModule,
    RouterModule,
    ButtonsModule,
    MatSlideToggleModule
  ]
})
export class PassengersModule { }
