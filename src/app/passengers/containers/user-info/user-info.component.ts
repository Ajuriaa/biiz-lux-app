import { Component, OnInit } from '@angular/core';
import { UserInfoQueries } from '../../services';
import { IUser } from '../../interfaces';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public user!: IUser;
  public address = '';

  constructor(
    private _userInfoQuery: UserInfoQueries
  ) {}

  ngOnInit(): void {
    this._userInfoQuery.getUserInformation().subscribe(({ data }) => {
      if (data) {
        this.user = data.currentUser;
        this.address = (this.user.userable.addresses && this.user.userable.addresses[0].name) || ''
      }
    });
  }
}
