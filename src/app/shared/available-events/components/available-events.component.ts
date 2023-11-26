import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EVENT } from 'src/app/core/constants';
import { Events } from 'src/app/core/enums';

const EVENTS = Object.keys(Events);
@Component({
  selector: 'app-available-events',
  templateUrl: './available-events.component.html',
  styleUrls: ['./available-events.component.scss']
})
export class AvailableEventsComponent {
  public events = EVENTS;
  @Input() public selectedEvent = EVENT;
  @Input() public isSelected = false;
  @Output() public selected = new EventEmitter();
}
