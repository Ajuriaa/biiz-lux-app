import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventDetailModule } from '../event-detail-card/event-detail.module';
import { EventListComponent } from './components/event-list.component';

@NgModule({
  declarations: [EventListComponent],
  exports: [EventListComponent],
  imports: [
    CommonModule,
    RouterModule,
    EventDetailModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventListModule {

}
