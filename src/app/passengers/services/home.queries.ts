import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode, ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { CookieHelper } from 'src/app/core/helpers';
import { ICurrentTripResponse } from '../interfaces';

export const activeTripQuery: DocumentNode = gql`
  query activeTripQuery {
    activeTrip {
      id
      status
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class HomeQueries {
  constructor(private _apollo: Apollo) {}

  public getCurrentTrip(
  ): Observable<ApolloQueryResult<ICurrentTripResponse>> {
    return this._apollo.watchQuery<ICurrentTripResponse>({
      query: activeTripQuery,
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
