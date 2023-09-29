import { Component, Input } from '@angular/core';
import { DEFAULT_COORDS, TRIP } from 'src/app/core/constants';
import { ITrip } from 'src/app/passengers/interfaces';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss']
})
export class DriverCardComponent {
  @Input() public driver = { id: 1, coordinates: DEFAULT_COORDS };
  @Input() public trip: ITrip = TRIP;
  @Input() public unique = false;
}
