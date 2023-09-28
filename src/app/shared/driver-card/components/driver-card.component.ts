import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { DEFAULT_COORDS } from 'src/app/core/constants';
import { ICoordinate } from 'src/app/core/interfaces';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss']
})
export class DriverCardComponent {
  @Input() public driver = { id: 1, distance: 1, coords: DEFAULT_COORDS };
  @Input() public unique = false;
}
