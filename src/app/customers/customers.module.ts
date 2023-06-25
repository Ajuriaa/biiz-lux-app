import { NgModule } from '@angular/core';
import { HeaderModule } from '../shared';
import { HomeComponent } from './containers/home/home.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CustomersRoutingModule,
    HeaderModule
  ]
})
export class CustomersModule {}
