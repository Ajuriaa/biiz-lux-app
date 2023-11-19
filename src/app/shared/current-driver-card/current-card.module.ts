import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CurrentDriverCardComponent } from './components/current-card.component';
import { TimerModule } from '../timer/timer.module';

@NgModule({
  declarations: [CurrentDriverCardComponent],
  exports: [CurrentDriverCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    TimerModule
  ]
})
export class CurrentDriverCardModule {}
