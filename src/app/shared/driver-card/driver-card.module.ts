import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DriverCardComponent } from './components/driver-card.component';

@NgModule({
  declarations: [DriverCardComponent],
  exports: [DriverCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ]
})
export class DriverCardModule {}
