import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode, ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { TokenHelper } from 'src/app/core/helpers';
import { IUserInfoResponse } from '../interfaces';

const userInfoQuery: DocumentNode = gql`
  query userInfoQuery {
    currentUser {
      email
      fullName
      phoneNumber
      userable {
        addresses {
          address
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class UserInfoQueries {
  constructor(private _apollo: Apollo) {}

  public getUserInformation(
  ): Observable<ApolloQueryResult<IUserInfoResponse>> {
    return this._apollo.watchQuery<IUserInfoResponse>({
      query: userInfoQuery,
      context: {
        headers: new HttpHeaders().set('Authorization', this._getToken())
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-first'
    }).valueChanges;
  }

  private _getToken(): string {
    return TokenHelper.getToken();
  }
}
