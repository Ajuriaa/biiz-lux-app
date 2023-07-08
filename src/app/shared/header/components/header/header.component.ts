import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private _router: Router,
    private _location: Location,
  ) {}

  public navigate(): void {
    this._router.navigateByUrl('passenger/home');
  }

  public isProfileRoute(): boolean {
    return this._router.url.includes('profile');
  }

  public goToPreviousPage(): void {
    this._location.back();
  }
}
