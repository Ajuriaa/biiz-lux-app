import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode, ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { CookieHelper } from 'src/app/core/helpers';
import { IProfileHeaderResponse } from '../interfaces';

const userInfoQuery: DocumentNode = gql`
  query userInfoQuery {
    currentUser {
      id
      imageUrl
      fullName
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ProfileHeaderQueries {
  constructor(private _apollo: Apollo) {}

  public getUserInformation(
  ): Observable<ApolloQueryResult<IProfileHeaderResponse>> {
    return this._apollo.watchQuery<IProfileHeaderResponse>({
      query: userInfoQuery,
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
