import { Component, Input } from '@angular/core';
import { DEFAULT_COORDS, TRIP } from 'src/app/core/constants';
import { ITrip } from 'src/app/passengers/interfaces';

@Component({
  selector: 'app-current-driver',
  templateUrl: './current-card.component.html',
  styleUrls: ['./current-card.component.scss']
})
export class CurrentDriverCardComponent {
  @Input() public trip: ITrip = TRIP;
  @Input() public tripTime = 300;
}
