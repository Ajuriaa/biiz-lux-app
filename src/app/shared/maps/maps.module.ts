import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './components/maps.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    MapsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MapsComponent
  ],
})
export class MapsModule {}
