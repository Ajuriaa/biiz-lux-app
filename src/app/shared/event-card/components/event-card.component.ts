import { Component, Input } from '@angular/core';
import { Events } from 'src/app/core/enums';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {
  @Input() public event = '';
  @Input() public unique = false;

  public imageUrl(name: string): string {
    const event = Events[name as keyof typeof Events];
    return `https://biiz-bucket.s3.us-east-2.amazonaws.com/${event}.png`;
  }
}
