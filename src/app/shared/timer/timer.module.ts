import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TimerComponent } from './components/timer.component';

@NgModule({
  declarations: [TimerComponent],
  exports: [TimerComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class TimerModule { }
