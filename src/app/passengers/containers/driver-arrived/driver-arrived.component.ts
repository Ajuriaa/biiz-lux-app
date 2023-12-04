import { Component } from '@angular/core';
import { RouterService } from 'src/app/core/services';


@Component({
  selector: 'app-driver-arrived',
  templateUrl: './driver-arrived.component.html',
  styleUrls: ['./driver-arrived.component.scss']
})
export class DriverArrivedComponent {

  constructor(private _routerService: RouterService){}

  public submit(): void {
    this._routerService.transition('/passenger/traveling');
  }
}
