import { NgModule } from '@angular/core';
import { HomeComponent } from './containers/home/home.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CustomersRoutingModule
  ]
})
export class CustomersModule {}
