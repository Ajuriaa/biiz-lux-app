import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '../core/enums';
import { AuthGuard, RoleGuard } from '../core/guards';
import {
  ExperiencesComponent,
  HomeComponent,
  AirportComponent,
  SpecialsComponent,
  ForgotSomethingComponent,
  AccidentComponent,
  PassengerRouterComponent
} from './containers';

const routes: Routes = [{
  path: '',
  component: PassengerRouterComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: [Role.passenger] },
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
      title: 'Aeropuertos',
      component: AirportComponent
    },
    {
      path: 'specials',
      title: 'Especiales',
      component: SpecialsComponent
    },
    {
      path: 'forgot-something',
      title: 'Olvidé Algo',
      component: ForgotSomethingComponent
    },
    {
      path: 'accident',
      title: 'Me Accidenté',
      component: AccidentComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengersRoutingModule { }
