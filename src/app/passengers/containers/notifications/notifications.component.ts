import { Component, OnInit } from '@angular/core';
import { INotification } from '../../interfaces';
import { NotificationQueries } from '../../services';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public notifications: INotification[] = [];

  constructor(private _notificationsQuery: NotificationQueries) { }

  ngOnInit(): void {
    this._notificationsQuery.getNotifications().subscribe(({ data }) => {
      if (data) {
        this.notifications = data.notifications;
      }
    });
  }
}
