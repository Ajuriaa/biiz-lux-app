import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventCardModule } from '../event-card/event-card.module';
import { AvailableEventsComponent } from './components/available-events.component';

@NgModule({
  declarations: [AvailableEventsComponent],
  exports: [AvailableEventsComponent],
  imports: [
    CommonModule,
    RouterModule,
    EventCardModule
  ]
})
export class AvailableEventsModule {

}
