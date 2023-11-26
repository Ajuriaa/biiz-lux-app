import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { clearAllCookies } from 'src/app/core/helpers';
import { RouterService } from 'src/app/core/services';

@Component({
  selector: 'app-profile.component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(
    private _router: Router,
    private _routerService: RouterService
  ) {}

  public removeCookies(): void {
    clearAllCookies();
    this._router.navigate(['']);
  }

  public goTocustomerService(): void {
    this._routerService.transition('customer-service');
  }
}
