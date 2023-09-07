import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from '../header/header.module';
import { ButtonsModule } from '../buttons/buttons.module';
import { CustomerServiceComponent } from './components/customer-service.component';

@NgModule({
  declarations: [CustomerServiceComponent],
  exports: [CustomerServiceComponent],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    ButtonsModule,
    IonicModule.forRoot()
  ]
})
export class CustomerServiceModule { }
