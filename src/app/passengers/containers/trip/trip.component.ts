import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MapService, SharedDataService, WebsocketService } from 'src/app/core/services';
import { ICoordinate, IDriver, ITripInfo } from 'src/app/core/interfaces';
import { DEFAULT_COORDS } from 'src/app/core/constants';
import { MarkerUrl } from 'src/app/core/enums';
import { CookieHelper, calculateMidpoint, getCloseDrivers } from 'src/app/core/helpers';
import { ToastComponent } from 'src/app/shared/toaster';
import { Router } from '@angular/router';

const IMAGE_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/iiz-green.png';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
  animations: [
    trigger(
      'inAnimation',[
        transition(':enter',
          [
            style({ opacity: 0 }),
            animate('1.5s ease-out', style({ opacity: 1 }))
          ]
        ),
        transition(':leave',
          [
            style({ opacity: 1 }),
            animate('0.5s ease-in', style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class TripComponent implements OnInit, OnDestroy {
  public imageUrl = IMAGE_URL;
  public driverSelected = false;
  public selectedDriver = { id: 1, coordinates: DEFAULT_COORDS };
  public autocompleteCurrentAddresses: any = [];
  public autocompleteCurrent = { input: ''};
  public autocompleteDestinationAddresses: any = [];
  public autocompleteDestination = { input: ''};
  public loading = false;
  public map!: google.maps.Map;
  public drivers : IDriver[] = [];
  public travelConfirmed = false;
  @ViewChild('map', { static: true }) public mapRef!: ElementRef;
  private currentCoordinates = DEFAULT_COORDS;
  private startCoordinates = DEFAULT_COORDS;
  private endCoordinates = DEFAULT_COORDS;


  constructor(
    private sharedDataService: SharedDataService,
    private mapService: MapService,
    private websocket: WebsocketService,
    private toaster: ToastComponent,
    private _router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.currentCoordinates = await this.sharedDataService.setDefaultCoordinates();
    this.map = this.mapService.generateDefaultMap(this.currentCoordinates, this.mapRef);
    const marker = this.mapService.addMarker(this.currentCoordinates, this.map, MarkerUrl.passenger);
    this.sharedDataService.setCurrentMarker(marker);
    this.autocompleteCurrent.input = await this.mapService.getPlaceFromCoordinate(this.currentCoordinates);
    setTimeout(() => { this.loading = false; }, 4000);
    setTimeout(() => this.websocket.getDriverCoordinates(), 3000);
    setTimeout(() => {
      const closestDrivers = getCloseDrivers(this.currentCoordinates, this.sharedDataService.getDriverCoordinates());

      for (const driverCoords of closestDrivers) {
        this.mapService.addMarker(driverCoords, this.map, MarkerUrl.driver);
      }

      this.drivers = this.sharedDataService.getDrivers();
    } , 4000);
  }

  ngOnDestroy(): void {
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
    }
  }

  public UpdateSearchResults(field: {input: string}, destination = false) {
    this.mapService.placesSearchResult(field).then((predictions) => {
      destination ? this.autocompleteDestinationAddresses = predictions : this.autocompleteCurrentAddresses = predictions;
    });
  }

  public async SelectSearchResult(address: string, destination = false): Promise<void> {
    const addressCoordinates = await this.mapService.getCoordinateFromPlace(address);
    const marker = this.mapService.addMarker(addressCoordinates, this.map, MarkerUrl.passenger, false);
    const markerCoords = this.LatLngToICoordinate(marker.getPosition());

    if(destination) {
      this.autocompleteDestination.input = address;
      this.autocompleteDestinationAddresses = [];
      const initialMarker = this.sharedDataService.getCurrentMarker().getPosition();
      this.startCoordinates = this.LatLngToICoordinate(initialMarker);
      this.endCoordinates = markerCoords;
      this.mapService.renderRoute(
        this.startCoordinates,
        this.endCoordinates,
        this.map
      );
      const centeredCoords = calculateMidpoint(markerCoords, this.LatLngToICoordinate(initialMarker));
      this.map.panTo(centeredCoords);
    } else {
      this.autocompleteCurrent.input = address;
      this.autocompleteCurrentAddresses = [];
      this.mapService.removeMarker(this.sharedDataService.getCurrentMarker());
      this.sharedDataService.setCurrentMarker(marker);
      this.map.setZoom(13);
      setTimeout(() => {
        this.map.panTo(markerCoords);
      }, 350);
    }
  }

  public ClearAutocomplete(destination = false): void {
    destination ? this.autocompleteDestinationAddresses = [] : this.autocompleteCurrentAddresses = [];
  }

  public async submit(): Promise<void> {
    if(this.autocompleteDestination.input === '' || this.autocompleteCurrent.input === ''){
      return this.toaster.errorToast('Debes llenar ambas direcciones!');
    }

    this.travelConfirmed = true;
  }

  public selectDriver(driver: { id: number, coordinates: ICoordinate }): void {
    this.selectedDriver = driver;
    this.driverSelected = true;
  }

  public async startTrip(): Promise<void> {
    this.loading = true;
    const passengerId = +this._getUserInfo();
    const info : ITripInfo = {
      driver_id: this.selectedDriver.id,
      start_coords: this.startCoordinates,
      end_coords: this.endCoordinates,
      passenger_id: passengerId,
      fare: Math.floor(Math.random() * 200)
    };
    this.websocket.startTrip(info);

    setTimeout(() => {
      this._router.navigate(['passenger/awaiting-trip']);
    }, 1000);
  }

  private LatLngToICoordinate(latLng: any): ICoordinate {
    return {lat: latLng.lat(), lng: latLng.lng()};
  }

  private _getUserInfo(): string {
    return CookieHelper.getUserInfo();
  }
}
