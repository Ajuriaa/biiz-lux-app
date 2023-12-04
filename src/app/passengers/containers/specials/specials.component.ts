import { Component } from '@angular/core';
import { RouterService } from 'src/app/core/services';

@Component({
  selector: 'app-specials',
  templateUrl: './specials.component.html',
  styleUrls: ['./specials.component.scss']
})
export class SpecialsComponent {

  constructor( private _routerService: RouterService) { }
  public goToPath(): void {
    this._routerService.transition('/passenger/trip');
  }
}
