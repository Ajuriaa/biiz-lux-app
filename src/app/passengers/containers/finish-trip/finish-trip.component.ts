import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService, GlobalWebsocketService } from 'src/app/core/services';


@Component({
  selector: 'app-finish-trip',
  templateUrl: './finish-trip.component.html',
  styleUrls: ['./finish-trip.component.scss']
})
export class FinishTripComponent {
  constructor(
    private _router: Router,
    private websocket: GlobalWebsocketService,
    private sharedData: SharedDataService
  ){}

  public tripDetails(): void {
    this.websocket.unsubscribe();
    this.sharedData.resetData();
    this._router.navigate(['/passenger/trip-detail']);
  }
}
