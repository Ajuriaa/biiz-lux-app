import { Component } from '@angular/core';

const IMAGE_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/raptor-experience.png';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent {
  public imageUrl = IMAGE_URL;
}
