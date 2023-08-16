import { Component, OnInit } from '@angular/core';
import { UserInfoQueries } from "src/app/passengers/services";
import { USER } from 'src/app/core/constants';
import { IUser } from 'src/app/passengers/interfaces';

@Component({
  selector: 'app-profile.component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: IUser = USER;

  constructor(
    private _userInfoQuery: UserInfoQueries
  ) {}

  ngOnInit() {
    this._userInfoQuery.getUserInformation().subscribe(({ data }): void => {
      if (data) {
        this.user = data.currentUser;
      }
    });
  }
}
