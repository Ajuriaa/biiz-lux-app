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
  PassengerRouterComponent,
  UserInfoComponent,
  TripComponent,
  CancelTripComponent,
  ProgramTripComponent
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
    },
    {
      path: 'trip',
      title: 'Viaje',
      component: TripComponent
    },
    {
      path: 'user-info',
      title: 'Mis Datos',
      component: UserInfoComponent
    },
    {
      path: 'cancel-trip',
      title: 'Cancelar Viaje',
      component: CancelTripComponent
    },
    {
      path: 'program-trip',
      title: 'Programar Viaje',
      component: ProgramTripComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengersRoutingModule { }
