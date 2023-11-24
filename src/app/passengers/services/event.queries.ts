import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode, ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { CookieHelper } from 'src/app/core/helpers';
import { IEventResponse } from '../interfaces';

export const allEventsQuery: DocumentNode = gql`
  query allEventsQuery {
    allEvents {
      id
      name
      addressName
      category
      description
      imageUrl
      locationCoordinates {
        lat
        lng
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class EventQueries {
  constructor(private _apollo: Apollo) {}

  public getEvents(
  ): Observable<ApolloQueryResult<IEventResponse>> {
    return this._apollo.watchQuery<IEventResponse>({
      query: allEventsQuery,
      context: {
        headers: new HttpHeaders().set('Authorization', this._getToken())
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-first'
    }).valueChanges;
  }

  private _getToken(): string {
    return CookieHelper.getToken();
  }
}
