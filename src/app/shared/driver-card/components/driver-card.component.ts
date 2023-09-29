import { Component, Input } from '@angular/core';
import { DEFAULT_COORDS } from 'src/app/core/constants';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss']
})
export class DriverCardComponent {
  @Input() public driver = { id: 1, coordinates: DEFAULT_COORDS };
  @Input() public unique = false;
}
