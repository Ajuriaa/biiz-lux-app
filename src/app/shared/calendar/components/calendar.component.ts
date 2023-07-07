import { Component } from '@angular/core';

const IMAGE_URL = 'https://biz-app-bucket.s3.us-east-2.amazonaws.com/iiz.png';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  public imageUrl = IMAGE_URL;
}
