import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { clearAllCookies } from 'src/app/core/helpers';

@Component({
  selector: 'app-profile.component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(
    private _router: Router
  ) {}

  public removeCookies(): void {
    clearAllCookies();
    this._router.navigate(['']);
  }
}
