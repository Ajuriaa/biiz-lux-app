import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TripCardComponent } from './components/trip-card.component';

@NgModule({
  declarations: [TripCardComponent],
  exports: [TripCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class TripCardModule { }
