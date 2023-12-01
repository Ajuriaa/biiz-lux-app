import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapService, SharedDataService, RouterService } from 'src/app/core/services';
import { DEFAULT_COORDS, TRIP } from 'src/app/core/constants';
import { MarkerUrl } from 'src/app/core/enums';
import { ICoordinate } from 'src/app/core/interfaces';
import { firstValueFrom } from 'rxjs';
import { TripQueries } from '../../services';
import { ITrip } from '../../interfaces';


@Component({
  selector: 'app-awaiting-trip',
  templateUrl: './awaiting-trip.component.html',
  styleUrls: ['./awaiting-trip.component.scss']
})
export class AwaitingTripComponent implements OnInit, OnDestroy {
  public map!: google.maps.Map;
  public driver = { id: 1, coordinates: DEFAULT_COORDS };
  public trip: ITrip = TRIP;
  public loading = false;
  @ViewChild('map', { static: true }) public mapRef!: ElementRef;
  private currentCoordinates: ICoordinate = DEFAULT_COORDS;
  private interval: any = 0;
  private driverMarker = new google.maps.Marker();
  private route: any;
  private oldRoute!: google.maps.DirectionsRenderer;

  constructor(
    private sharedDataService: SharedDataService,
    private mapService: MapService,
    private _tripQuery: TripQueries,
    private _routerService: RouterService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = false;
    this.map = this.mapService.generateDefaultMap(this.currentCoordinates, this.mapRef);
    const tripId = this.sharedDataService.getCurrentTrip().tripId;
    const queryResponse = await firstValueFrom(this._tripQuery.getTrip(+tripId));
    this.trip = queryResponse.data.trip;
    this.currentCoordinates = {lat: +this.trip.startLocation.lat, lng: +this.trip.startLocation.lng};
    this.mapService.addMarker(this.currentCoordinates, this.map, MarkerUrl.passenger);
    this.map.setCenter(this.currentCoordinates);
    setTimeout(() => {
      this.loading = false;
      this.driverMarker = this.mapService.addMarker(this.sharedDataService.getDriverCoord(), this.map, MarkerUrl.driver);
      this.route = this.mapService.renderRoute(this.sharedDataService.getDriverCoord(), this.currentCoordinates, this.map);
    }, 3000);
    this.interval = setInterval(() => {
      this.trackDriver(this.sharedDataService.getDriverCoord());
      this.driverArrived();
    }, 500);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  private trackDriver(coords: ICoordinate) {
    if(this.route){
      this.oldRoute = this.route;
    }
    this.route = this.mapService.renderRoute(coords, this.currentCoordinates, this.map, true);
    this.oldRoute.setMap(null);
    this.driverMarker.setPosition(coords);
  }

  private driverArrived(){
    if(this.sharedDataService.getDriverArrived()){
      this._routerService.transition('passenger/driver-arrived');
    }
  }
}
