import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '../core/enums';
import {
  ExperiencesComponent,
  HomeComponent
} from './containers';
import { AirportComponent } from './containers/airport/airport.component';


const routes: Routes = [{
  path: '',
  data: { roles: [Role.customer] },
  children: [
    {
      path: 'home',
      title: 'Inicio',
      component: HomeComponent
    },
    {
      path: 'experiences',
      title: 'Experiencias',
      component: ExperiencesComponent
    },
    {
      path: 'airport',
      title: 'Airport',
      component: AirportComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengersRoutingModule { }
