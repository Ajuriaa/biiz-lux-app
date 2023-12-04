import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EventDetailComponent } from './components/event-detail-card.component';

@NgModule({
  declarations: [EventDetailComponent],
  exports: [EventDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ]
})
export class EventDetailModule {}
