import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DriverCardModule } from '../driver-card/driver-card.module';
import { AvailableDriversComponent } from './components/available-drivers.component';

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
