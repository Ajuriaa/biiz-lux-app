import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvailableDriversComponent } from './components/available-drivers.component';
import { DriverCardModule } from '../driver-card/driver-card.module';

@NgModule({
  declarations: [AvailableDriversComponent],
  exports: [AvailableDriversComponent],
  imports: [
    CommonModule,
    RouterModule,
    DriverCardModule
  ]
})
export class AvailableDriversModule {

}
