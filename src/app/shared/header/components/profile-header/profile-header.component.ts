import { Component, Input } from '@angular/core';

const DEFAULT_IMAGE_URL = 'https://biz-app-bucket.s3.us-east-2.amazonaws.com/profile-image.png';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent {
  @Input() imgSrc = DEFAULT_IMAGE_URL;
  @Input() profileName = 'PROFILE NAME';
  @Input() showEditIcon = false;
}
