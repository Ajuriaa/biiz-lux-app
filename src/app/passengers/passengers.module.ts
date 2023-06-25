import { NgModule } from '@angular/core';
import { HeaderModule } from '../shared';
import { HomeComponent } from './containers/home/home.component';
import { PassengersRoutingModule } from './passengers-routing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    PassengersRoutingModule,
    HeaderModule
  ]
})
export class PassengersModule {}
