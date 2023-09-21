import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DocumentNode, ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { TokenHelper } from 'src/app/core/helpers';
import { IAddressResponse } from '../interfaces';

const addressesQuery: DocumentNode = gql`
  query addressesQuery {
    addresses {
      id
      name
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AddressQueries {
  constructor(private _apollo: Apollo) {}

  public getUserAddresses(
  ): Observable<ApolloQueryResult<IAddressResponse>> {
    return this._apollo.watchQuery<IAddressResponse>({
      query: addressesQuery,
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
