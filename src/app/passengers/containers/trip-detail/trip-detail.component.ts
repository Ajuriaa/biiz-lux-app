import { Component, OnInit } from '@angular/core';
import { TRIP } from 'src/app/core/constants';
import { RouterService, SharedDataService } from 'src/app/core/services';
import { convertUtcToGmtMinus6 } from 'src/app/core/helpers';
import { TripQueries } from '../../services';
import { ITrip } from '../../interfaces';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  public trip: ITrip = TRIP;
  public loading = true;
  public startTime = '00:00';
  public endTime = '00:00';

  constructor(
    private _routerService: RouterService,
    private tripQuery: TripQueries,
    private sharedData: SharedDataService
  ){}

  ngOnInit(): void {
    const tripId = this.sharedData.getCurrentTrip().tripId;
    this.tripQuery.getTrip(+tripId).subscribe(({ data }) => {
      if (data) {
        this.trip = data.trip;
        this.loading = false;
        this.startTime = convertUtcToGmtMinus6(this.trip.startTime);
        this.endTime = convertUtcToGmtMinus6(this.trip.endTime || '');
      }
    });
  }

  public goHome(){
    this.sharedData.resetCurrentTrip();
    this._routerService.transition('/passenger/home');
  }
}
