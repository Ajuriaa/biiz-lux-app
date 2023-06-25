import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule, HeaderModule } from '../shared';
import { HomeComponent } from './containers/home/home.component';
import { PassengersRoutingModule } from './passengers-routing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PassengersRoutingModule,
    HeaderModule,
    ButtonsModule
  ]
})
export class PassengersModule {}
