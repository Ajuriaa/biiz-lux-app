import { Component, Input } from '@angular/core';
import { DEFAULT_COORDS, TRIP } from 'src/app/core/constants';
import { ITrip } from 'src/app/passengers/interfaces';

const IMAGE_URLS = [
  'private.png',
  'trendy.png',
  'sports.png',
  'scan.png',
  'concerts.png'
];

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {
  @Input() public event = { id: 0, label: 'trendy' };
  @Input() public unique = false;

  public imageUrl(name: string): string {
    return `https://biiz-bucket.s3.us-east-2.amazonaws.com/${name}.png`;
  }
}
