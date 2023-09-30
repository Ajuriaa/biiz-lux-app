import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode, ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { CookieHelper } from 'src/app/core/helpers';
import { IHomeResponse } from '../interfaces';

const weatherQuery: DocumentNode = gql`
  query weatherQuery {
    weather {
      weather {
        icon
      }
      main {
        temp
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class WeatherQueries {
  constructor(private _apollo: Apollo) {}

  public getWeatherData(
  ): Observable<ApolloQueryResult<IHomeResponse>> {
    return this._apollo.watchQuery<IHomeResponse>({
      query: weatherQuery,
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
