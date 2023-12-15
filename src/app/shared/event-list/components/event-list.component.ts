import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Events } from 'src/app/core/enums';
import { IEvent } from 'src/app/passengers/interfaces';

const EVENTS = Object.keys(Events);
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  public events = EVENTS;
  @Input() public eventList: IEvent[] = [];
  @Output() public selected = new EventEmitter();
}