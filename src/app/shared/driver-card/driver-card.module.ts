import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoadingModule } from '../loading/loading.module';
import { DriverCardComponent } from './components/driver-card.component';

@NgModule({
  declarations: [DriverCardComponent],
  exports: [DriverCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    LoadingModule
  ]
})
export class DriverCardModule {}
