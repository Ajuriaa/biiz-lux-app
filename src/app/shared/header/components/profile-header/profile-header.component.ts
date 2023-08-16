import { Component, Input } from '@angular/core';

const DEFAULT_IMAGE_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/profile-image.png';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent {
  @Input() imgSrc = DEFAULT_IMAGE_URL;
  @Input() profileName = 'TU PERFIL';
  @Input() showEditIcon = false;
}
