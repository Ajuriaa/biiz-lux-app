import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
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
          this._setCookie(token, role);
          resolve(data);
        }
      }, (error) => {
        this.toaster.errorToast(error.message);
      });
    });
  }

  private _setCookie(token: string, role: string): void {
    const date = new Date();
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = `BZ-TOKEN=${token};${expires};path=/`;
    document.cookie = `BZ-ROLE=${role};${expires};path=/`;
  }
}
