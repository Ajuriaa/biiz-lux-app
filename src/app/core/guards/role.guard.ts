import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Role } from '../enums';
import { RoleHelper } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(private _router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    const currentRole = RoleHelper.getRole();
    const roleIsAllowed = route.data.roles.some((role: Role) => currentRole.includes(role) );

    if (roleIsAllowed) { return true; }

    this._router.navigate(['/not-allowed']);
    return true;
  }
}
