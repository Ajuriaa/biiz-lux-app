import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { ToastComponent } from 'src/app/shared/toaster';
import { HttpHeaders } from '@angular/common/http';
import { CookieHelper } from 'src/app/core/helpers';
import { IAddress } from '../interfaces';
import { addressesQuery } from './address.queries';

const createAddress = gql `
  mutation createAddress($addressInput: AddressInput!) {
    createAddress(addressAttributes: $addressInput)
  }
`;

@Injectable()
export class AddressMutations {
  private _mutateSub!: Subscription;

  constructor(private _apollo: Apollo, private toaster: ToastComponent) {}

  public createAddress(address: IAddress): Promise<boolean> {
    return new Promise ((resolve) => {
      if (this._mutateSub) { this._mutateSub.unsubscribe(); }
      this._mutateSub = this._apollo.mutate({
        mutation: createAddress,
        variables: {
          addressInput: address
        },
        refetchQueries: [{
          query: addressesQuery,
          context: {
            headers: new HttpHeaders().set('Authorization', this._getToken())
          },
        }],
        context: {
          headers: new HttpHeaders().set('Authorization', this._getToken())
        }
      }).subscribe(({ data }: any) => {
        if (data) {
          this.toaster.successToast("Dirección creada correctamente");
          resolve(data);
        }
      }, (error) => {
        this.toaster.errorToast(error.message);
      });
    });
  }

  private _getToken(): string {
    return CookieHelper.getToken();
  }
}
