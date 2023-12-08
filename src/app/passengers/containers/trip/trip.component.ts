import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MapService, SharedDataService, GlobalWebsocketService, RouterService } from 'src/app/core/services';
import { ICoordinate, IDriver } from 'src/app/core/interfaces';
import { DEFAULT_COORDS } from 'src/app/core/constants';
import { MarkerUrl } from 'src/app/core/enums';
import { CookieHelper, getCloseDrivers } from 'src/app/core/helpers';
import { ToastComponent } from 'src/app/shared/toaster';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public selectedDriver = { id: 0, coordinates: DEFAULT_COORDS, eta: 0 };
  public autocompleteCurrentAddresses: any = [];
  public autocompleteCurrent = { input: ''};
  public autocompleteDestinationAddresses: any = [];
  public autocompleteDestination = { input: ''};
  public loading = false;
  public map!: google.maps.Map;
  public drivers : IDriver[] = [];
  public travelConfirmed = false;
  public addressForm: FormGroup = new FormGroup({});
  @ViewChild('map', { static: true }) public mapRef!: ElementRef;
  private currentCoordinates = DEFAULT_COORDS;
  private startCoordinates = DEFAULT_COORDS;
  private endCoordinates = DEFAULT_COORDS;
  subscription: any;


  constructor(
    private sharedDataService: SharedDataService,
    private mapService: MapService,
    private websocket: GlobalWebsocketService,
    private toaster: ToastComponent,
    private _routerService: RouterService,
    private readonly _formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.addressForm = this._formBuilder.group({
      startAddress: ['', [Validators.required]],
      endAddress: ['', [Validators.required]]
    });
    this.websocket.connectWebSocket();
    this.currentCoordinates = await this.sharedDataService.setDefaultCoordinates();
    this.map = this.mapService.generateDefaultMap(this.currentCoordinates, this.mapRef);
    const marker = this.mapService.addMarker(this.currentCoordinates, this.map, MarkerUrl.passenger);
    this.sharedDataService.setCurrentMarker(marker);
    this.autocompleteCurrent.input = await this.mapService.getPlaceFromCoordinate(this.currentCoordinates);
    setTimeout(() => this.websocket.getDriverCoordinates(), 3000);
    setTimeout(() => {
      const closestDrivers = getCloseDrivers(this.currentCoordinates, this.sharedDataService.getDriverCoordinates());

      for (const driverCoords of closestDrivers) {
        this.mapService.addMarker(driverCoords, this.map, MarkerUrl.driver);
      }

      this.drivers = this.sharedDataService.getDrivers();
      this.loading = false;
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
    if(destination) {
      this.autocompleteDestinationAddresses = [];
      this.autocompleteDestination.input = '';
    } else {
      this.autocompleteCurrentAddresses = [];
      this.autocompleteCurrent.input = '';
    }
  }

  public async submit(): Promise<void> {
    if(this.autocompleteDestination.input === '' || this.autocompleteCurrent.input === ''){
      return this.toaster.errorToast('Debes llenar ambas direcciones!');
    }
    this.sharedDataService.setPassengerCoords(this.startCoordinates);
    this.loading = true;
    await this.getEtas();
    await this.setTripDistance();
    this.loading = false;
  }

  public async setTripDistance(): Promise<void> {
    const tripDistance = await this.mapService.getDistance(this.startCoordinates, this.endCoordinates);
    this.sharedDataService.setGlobalDistance(tripDistance);
  }

  public async getEtas(): Promise<void> {
    const tripEstimatedTime = this.mapService.getEstimatedTime(this.startCoordinates, this.endCoordinates);
    this.sharedDataService.setGlobalEta(await tripEstimatedTime);
    this.travelConfirmed = true;
  }

  public selectDriver(driver: { id: number, coordinates: ICoordinate, eta: 0 }): void {
    this.selectedDriver = driver;
    this.driverSelected = true;
  }

  public async startTrip(): Promise<void> {
    this.loading = true;
    const passengerId = +this._getUserInfo();
    const info : any = {
      title: 'driverRequest',
      driver_id: this.selectedDriver.id,
      start_coords: this.startCoordinates,
      end_coords: this.endCoordinates,
      passenger_id: passengerId,
      start_location: this.autocompleteCurrent.input,
      start_time: new Date(),
      destination_location: this.autocompleteDestination.input,
      fare: this.sharedDataService.getTripFare()
    };
    this.websocket.startTrip(info);

    this.subscription = this.websocket.messageSubject.subscribe((message) => {
      if (message === 'accepted') {
        this._routerService.transition('passenger/awaiting-trip');
      } else {
        this.rejectedTrip();
      }
    });
  }

  private LatLngToICoordinate(latLng: any): ICoordinate {
    return {lat: latLng.lat(), lng: latLng.lng()};
  }

  private _getUserInfo(): string {
    return CookieHelper.getUserInfo();
  }

  private rejectedTrip(): void {
    this.selectedDriver = { id: 0, coordinates: DEFAULT_COORDS, eta: 0 };
    this.driverSelected = false;
    this.toaster.errorToast('El conductor no aceptó el viaje!');
    this.loading = false;
  }
}
