import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material';
import { ButtonsModule, HeaderModule } from '../shared';
import { HomeComponent } from './containers/home/home.component';
import { PassengersRoutingModule } from './passengers-routing.module';
import { ExperiencesComponent } from './containers';
import { ForgotSomethingComponent } from './containers/forgot-something/forgot-something.component';


@NgModule({
  declarations: [
    HomeComponent,
    ExperiencesComponent,
    ForgotSomethingComponent
  ],
  imports: [
    CommonModule,
    PassengersRoutingModule,
    HeaderModule,
    RouterModule,
    ButtonsModule,
    MaterialModule
  ]
})
export class PassengersModule { }
