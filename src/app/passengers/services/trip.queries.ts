import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode, ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { CookieHelper } from 'src/app/core/helpers';
import { ITripResponse } from '../interfaces';

export const tripQuery: DocumentNode = gql`
  query trip($tripId: Int!) {
    trip(tripId: $tripId) {
      id
      fare
      startAddress
      endAddress
      passenger {
        shortName
      }
      startLocation {
        lat
        lng
      }
      endLocation {
        lat
        lng
      }
      startAddress
      startTime
      endAddress
      endTime
      passenger {
        id
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class TripQueries {
  constructor(private _apollo: Apollo) {}

  public getTrip(tripId: number): Observable<ApolloQueryResult<ITripResponse>> {
    return this._apollo.watchQuery<ITripResponse>({
      query: tripQuery,
      variables: {
        tripId
      },
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
