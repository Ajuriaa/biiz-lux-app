import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from '../core/enums';
import { AuthGuard } from '../core/guards';
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
  ProgramTripComponent,
  AddressComponent,
  NewAddressComponent,
  AwaitingTripComponent,
  DriverArrivedComponent,
  FinishTripComponent,
  TripDetailComponent,
  EventsComponent,
  AddCardComponent,
  UserTripsComponent,
  NotificationsComponent
} from './containers';
import { TravelingComponent } from './containers/traveling/traveling.component';

const routes: Routes = [{
  path: '',
  component: PassengerRouterComponent,
  canActivate: [AuthGuard],
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
    },
    {
      path: 'address',
      title: 'Mis Direcciones',
      component: AddressComponent
    },
    {
      path: 'new-address',
      title: 'Nueva Dirección',
      component: NewAddressComponent
    },
    {
      path: 'awaiting-trip',
      title: 'Esperando Conductor',
      component: AwaitingTripComponent
    },
    {
      path: 'driver-arrived',
      title: 'Conductor afuera',
      component: DriverArrivedComponent
    },
    {
      path: 'traveling',
      title: 'Viajando',
      component: TravelingComponent
    },
    {
      path: 'finish-trip',
      title: 'Viaje terminado',
      component: FinishTripComponent
    },
    {
      path: 'trip-detail',
      title: 'Detalle Viaje',
      component: TripDetailComponent
    },
    {
      path: 'events',
      title: 'Eventos',
      component: EventsComponent
    },
    {
      path: 'add-card',
      title: 'Agregar Tarjeta',
      component: AddCardComponent
    },
    {
      path: 'my-trips',
      title: 'Mis Viajes',
      component: UserTripsComponent
    },
    {
      path: 'notifications',
      title: 'Notificaciones',
      component: NotificationsComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengersRoutingModule { }
