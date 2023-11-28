import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode, ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { CookieHelper } from 'src/app/core/helpers';
import { INotificationResponse } from '../interfaces';

export const notificationsQuery: DocumentNode = gql`
  query notifications {
    notifications {
      id
      imageUrl
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class NotificationQueries {
  constructor(private _apollo: Apollo) {}

  public getNotifications(): Observable<ApolloQueryResult<INotificationResponse>> {
    return this._apollo.watchQuery<INotificationResponse>({
      query: notificationsQuery,
      context: {
        headers: new HttpHeaders().set('Authorization', this._getToken())
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  private _getToken(): string {
    return CookieHelper.getToken();
  }
}
