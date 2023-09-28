import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvailableDriversComponent } from './components/available-drivers.component';

@NgModule({
  declarations: [AvailableDriversComponent],
  exports: [AvailableDriversComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AvailableDriversModule {

}
