import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DriverCardComponent } from './components/driver-card.component';

@NgModule({
  declarations: [DriverCardComponent],
  exports: [DriverCardComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DriverCardModule {}
