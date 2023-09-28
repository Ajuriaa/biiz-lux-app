import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MapService, SharedDataService, WebsocketService } from 'src/app/core/services';
import { ICoordinate } from 'src/app/core/interfaces';
import { DEFAULT_COORDS } from 'src/app/core/constants';
import { MarkerUrl } from 'src/app/core/enums';
import { calculateMidpoint, getCloseDrivers } from 'src/app/core/helpers';
import { ToastComponent } from 'src/app/shared/toaster';

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
        )
      ]
    )
  ]
})
export class TripComponent implements OnInit, OnDestroy {
  public imageUrl = IMAGE_URL;
  public autocompleteCurrentAddresses: any = [];
  public autocompleteCurrent = { input: ''};
  public autocompleteDestinationAddresses: any = [];
  public autocompleteDestination = { input: ''};
  public loading = false;
  public map!: google.maps.Map;
  public travelConfirmed = false;
  @ViewChild('map', { static: true }) public mapRef!: ElementRef;
  private currentCoordinates = DEFAULT_COORDS;


  constructor(
    private sharedDataService: SharedDataService,
    private mapService: MapService,
    private websocket: WebsocketService,
    private toaster: ToastComponent
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
      this.mapService.renderRoute(
        this.LatLngToICoordinate(initialMarker),
        markerCoords,
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

  private LatLngToICoordinate(latLng: any): ICoordinate {
    return {lat: latLng.lat(), lng: latLng.lng()};
  }
}

