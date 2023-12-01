import { Component, OnInit } from '@angular/core';
import { USER } from 'src/app/core/constants';
import { UserInfoQueries } from '../../services';
import { IUser } from '../../interfaces';

const IMAGE_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/scanner-icon.png';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public imageUrl = IMAGE_URL;
  public user: IUser = USER;
  public address = '';

  constructor(
    private _userInfoQuery: UserInfoQueries
  ) {}

  ngOnInit(): void {
    this._userInfoQuery.getUserInformation().subscribe(({ data }) => {
      if (data) {
        this.user = data.currentUser;
        this.address = this.user.userable.addresses ? this.user.userable.addresses[0].address : '';
      }
    });
  }
}
