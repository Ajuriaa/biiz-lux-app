import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapService, SharedDataService } from 'src/app/core/services';
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
  private driverMarker: google.maps.Marker | null = null;
  private route!: google.maps.DirectionsRenderer;

  constructor(
    private sharedDataService: SharedDataService,
    private mapService: MapService,
    private _tripQuery: TripQueries
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.map = this.mapService.generateDefaultMap(this.currentCoordinates, this.mapRef);

    const queryResponse = await firstValueFrom(this._tripQuery.getTrip(18));
    this.trip = queryResponse.data.trip;
    this.currentCoordinates = {lat: +this.trip.startLocation.lat, lng: +this.trip.startLocation.lng};
    this.mapService.addMarker(this.currentCoordinates, this.map, MarkerUrl.passenger);
    this.map.setCenter(this.currentCoordinates);
    setTimeout(() => this.loading = false, 1500);
    this.interval = setInterval(() => {
      this.trackDriver(this.sharedDataService.getDriverCoord());
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  private trackDriver(coords: ICoordinate) {
    if(this.driverMarker){
      this.mapService.removeMarker(this.driverMarker);
      this.route.setMap(null);
    }
    this.driverMarker = this.mapService.addMarker(coords, this.map, MarkerUrl.driver);
    this.route = this.mapService.renderRoute(coords, this.currentCoordinates, this.map);
    console.log('ruta: ',this.route);
  }
}
