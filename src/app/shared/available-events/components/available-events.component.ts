import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DEFAULT_COORDS } from 'src/app/core/constants';

@Component({
  selector: 'app-available-events',
  templateUrl: './available-events.component.html',
  styleUrls: ['./available-events.component.scss']
})
export class AvailableEventsComponent implements OnInit {
  @Input() public events = [{ id: 0, label: 'TRENDY' }];
  @Input() public selectedEvent = { id: 0, label: 'TRENDY' };
  @Input() public isSelected = false;
  @Output() public selected = new EventEmitter();

  ngOnInit() {
    this.isSelected ? this.events = [] : '';
  }
}
