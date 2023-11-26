import { Component, Input } from '@angular/core';
import { EVENT } from 'src/app/core/constants';
import { IEvent } from 'src/app/passengers/interfaces';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail-card.component.html',
  styleUrls: ['./event-detail-card.component.scss']
})
export class EventDetailComponent {
  @Input() public event: IEvent = EVENT;
  @Input() public selected = false;
}
