import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() public currentPath = '';

  public userRole = '';
  public imageUrl = '';

  constructor(
    private _location: Location,
    private _router: Router
  ) {}

  public navigate(): void {
    const currentPath = this.currentPath;
    const role = currentPath.split('/').slice(1)[0];
    const subjectTitle = currentPath.split('/').slice(1)[2];

    if (currentPath.includes('/topic/')) {
      this._router.navigate([`${role}/${subjectTitle}/topics`]);
    } else {
      this._location.back();
    }
  }
}
