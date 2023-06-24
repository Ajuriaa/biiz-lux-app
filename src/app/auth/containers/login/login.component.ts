import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public homePathname = '';

  constructor(
    private _router: Router
  ) {}

  public onSubmit(): void {
    // TODO: CHANGE THIS HARCODED PATH WHEN USERS ROLES ARE ADDED
    this.homePathname = `/customer/home`;
    this._router.navigate([this.homePathname]);
  }
}
