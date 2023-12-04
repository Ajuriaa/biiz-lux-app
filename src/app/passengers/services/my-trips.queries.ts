import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode, ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { CookieHelper } from 'src/app/core/helpers';
import { IUserTripsResponse } from '../interfaces';

export const userTripsQuery: DocumentNode = gql`
  query trips {
    trips {
      id
      status
      startTime
      startAddress
      endTime
      endAddress
      driver {
        id
        shortName
      }
      fare
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class MyTripsQueries {
  constructor(private _apollo: Apollo) {}

  public getTrips(): Observable<ApolloQueryResult<IUserTripsResponse>> {
    return this._apollo.watchQuery<IUserTripsResponse>({
      query: userTripsQuery,
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
