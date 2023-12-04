import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EventCardComponent } from './components/event-card.component';

@NgModule({
  declarations: [EventCardComponent],
  exports: [EventCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ]
})
export class EventCardModule {}
