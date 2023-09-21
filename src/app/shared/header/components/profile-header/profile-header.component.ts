import { Component, Input, OnInit } from '@angular/core';
import { USER } from 'src/app/core/constants';
import { IUser } from 'src/app/passengers/interfaces';
import { ProfileHeaderQueries } from 'src/app/shared/services';

const DEFAULT_IMAGE_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/profile-image.png';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {
  public user: IUser = USER;
  public imgSrc = '';
  public profileName = '';
  @Input() showEditIcon = false;

  constructor(
    private _profileHeaderQuery: ProfileHeaderQueries
  ) {}

  ngOnInit() {
    this._profileHeaderQuery.getUserInformation().subscribe(({ data }): void => {
      if (data) {
        this.user = data.currentUser;
        this.imgSrc = this.user.imageUrl || DEFAULT_IMAGE_URL;
        this.profileName = this.user.fullName || 'TU PERFIL';
      }
    });
  }
}
