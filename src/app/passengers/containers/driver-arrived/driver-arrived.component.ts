import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-driver-arrived',
  templateUrl: './driver-arrived.component.html',
  styleUrls: ['./driver-arrived.component.scss']
})
export class DriverArrivedComponent {

  constructor(private _router: Router){}

  public submit(): void {
    this._router.navigate(['/passenger/traveling']);
  }
}
