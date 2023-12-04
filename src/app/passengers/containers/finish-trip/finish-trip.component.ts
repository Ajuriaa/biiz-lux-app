import { Component } from '@angular/core';
import { SharedDataService, GlobalWebsocketService, RouterService } from 'src/app/core/services';


@Component({
  selector: 'app-finish-trip',
  templateUrl: './finish-trip.component.html',
  styleUrls: ['./finish-trip.component.scss']
})
export class FinishTripComponent {
  constructor(
    private _routerService: RouterService,
    private websocket: GlobalWebsocketService,
    private sharedData: SharedDataService
  ){}

  public tripDetails(): void {
    this.websocket.unsubscribe();
    this.sharedData.resetData();
    this._routerService.transition('/passenger/trip-detail');
  }
}
