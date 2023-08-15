import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './components/maps.component';

@NgModule({
  declarations: [
    MapsComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule
  ],
  exports: [
    MapsComponent
  ],
})
export class MapsModule {}
