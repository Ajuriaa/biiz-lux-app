import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_COORDS, TRIP } from 'src/app/core/constants';
import { MapService, SharedDataService } from 'src/app/core/services';
import { firstValueFrom } from 'rxjs';
import { MarkerUrl } from 'src/app/core/enums';
import { TripQueries } from '../../services';
import { ITrip } from '../../interfaces';


@Component({
  selector: 'app-traveling',
  templateUrl: './traveling.component.html',
  styleUrls: ['./traveling.component.scss']
})
export class TravelingComponent implements OnInit {
  public loading = false;
  public map!: google.maps.Map;
  public trip: ITrip = TRIP;
  @ViewChild('map', { static: true }) public mapRef!: ElementRef;
  private currentCoordinates = DEFAULT_COORDS;
  private endCoordinates = DEFAULT_COORDS;
  private carMarker: google.maps.Marker = new google.maps.Marker();
  private route!: google.maps.DirectionsRenderer;
  private oldRoute!: google.maps.DirectionsRenderer;
  private interval: any = 0;

  constructor(
    private sharedData: SharedDataService,
    private mapService: MapService,
    private _tripQuery: TripQueries,
    private _router: Router
  ){}

  async ngOnInit() {
    this.currentCoordinates = await this.sharedData.setDefaultCoordinates();
    const tripId = this.sharedData.getCurrentTrip().tripId;
    const queryResponse = await firstValueFrom(this._tripQuery.getTrip(+tripId));
    this.trip = queryResponse.data.trip;
    this.endCoordinates = {lat: +this.trip.endLocation.lat, lng: +this.trip.endLocation.lng};
    this.map = this.mapService.generateDefaultMap(this.currentCoordinates, this.mapRef);
    this.mapService.addMarker(this.endCoordinates, this.map, MarkerUrl.passenger);
    this.carMarker = this.mapService.addMarker(this.currentCoordinates, this.map, MarkerUrl.driver);
    this.route = this.mapService.renderRoute(this.currentCoordinates, this.endCoordinates, this.map);
    setTimeout(() => {
      this.map.panTo(this.currentCoordinates);
      this.map.setZoom(19);
    }, 1000);

    setTimeout(()=> this.trackCar(), 3000);

    this.interval = setInterval(() => {
      this.trackCar();
    }, 1000);
  }

  public center(): void {
    this.map.panTo(this.currentCoordinates);
    this.map.setZoom(19);
  }

  private async trackCar(){
    this.currentCoordinates = await this.sharedData.setDefaultCoordinates();
    this.carMarker.setPosition(this.currentCoordinates);
    this.oldRoute = this.route;
    this.route = this.mapService.renderRoute(this.currentCoordinates, this.endCoordinates, this.map, true);
    this.oldRoute.setMap(null);
    this.finishTrip();
  }

  private finishTrip(): void {
    if(this.sharedData.getFinishTrip()){
      this._router.navigate(['/passenger/finish-trip']);
    }
  }
}
