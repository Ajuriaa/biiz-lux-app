import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  ButtonsModule,
  CalendarModule,
  HeaderModule,
  LoadingModule,
  ToasterModule,
  AvailableDriversModule,
  DriverCardModule,
  EventCardModule,
  AvailableEventsModule
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
  CancelTripComponent,
  ProgramTripComponent,
  AddressComponent,
  NewAddressComponent,
  AwaitingTripComponent,
  DriverArrivedComponent,
  FinishTripComponent,
  TripDetailComponent,
  EventsComponent
} from './containers';
import { PassengersRoutingModule } from './passengers-routing.module';
import { AddressMutations } from './services';
import { TravelingComponent } from './containers/traveling/traveling.component';

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
    CancelTripComponent,
    ProgramTripComponent,
    AddressComponent,
    NewAddressComponent,
    AwaitingTripComponent,
    DriverArrivedComponent,
    TravelingComponent,
    FinishTripComponent,
    TripDetailComponent,
    EventsComponent
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
    IonicModule,
    CalendarModule,
    LoadingModule,
    ToasterModule,
    DriverCardModule,
    EventCardModule,
    AvailableDriversModule,
    AvailableEventsModule
  ],
  providers: [
    AddressMutations
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PassengersModule { }
