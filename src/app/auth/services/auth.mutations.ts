import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { setCapacitorCookie } from 'src/app/core/helpers';
import { ToastComponent } from 'src/app/shared/toaster';

const login = gql `
  mutation login($attributes: LoginInput!) {
    login(attributes: $attributes) {
      id
      token
      role
    }
  }
`;

@Injectable()
export class AuthMutations {
  private _mutateSub!: Subscription;

  constructor(private _apollo: Apollo, private toaster: ToastComponent) {}

  public login(userName: string, userPassword: string): Promise<any> {
    return new Promise ((resolve) => {
      if (this._mutateSub) { this._mutateSub.unsubscribe(); }
      this._mutateSub = this._apollo.mutate({
        mutation: login,
        variables: {
          attributes: {
            username: userName,
            password: userPassword
          }
        }
      }).subscribe(({ data }: any) => {
        if (data) {
          this.toaster.successToast("Sesión Iniciada correctamente");
          const token = data.login.token;
          const role = data.login.role;
          setCapacitorCookie('BZ-TOKEN', token);
          setCapacitorCookie('BZ-ROLE', role);
          resolve(data);
        }
      }, (error) => {
        this.toaster.errorToast(error.message);
      });
    });
  }
}
