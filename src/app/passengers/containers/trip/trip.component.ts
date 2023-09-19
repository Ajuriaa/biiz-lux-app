import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { environment } from 'src/environments/environments';
import { SharedDataService } from 'src/app/core/services';
import { calculateMidpoint } from 'src/app/core/helpers';
import { ICoordinate } from 'src/app/core/interfaces';

const IMAGE_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/iiz-green.png';
const MARKER_IMAGE = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/marker.png';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit, OnDestroy {
  public imageUrl = IMAGE_URL;
  public autocompleteCurrentAddresses: any = [];
  public autocompleteCurrent = { input: ''};
  public autocompleteDestinationAddresses: any = [];
  public autocompleteDestination = { input: ''};
  public GoogleAutocomplete: any;
  private currentCoordinates = {latitude: 0, longitude: 0};
  private markerImage = MARKER_IMAGE;
  @ViewChild('map', { static: true })
  mapRef!: ElementRef;
  newMap!: GoogleMap;

  constructor(
    private sharedDataService: SharedDataService,
    private nativeGeocoder: NativeGeocoder,
    private zone: NgZone
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  }

  ngOnInit() {
    const coords = this.sharedDataService.getCoordinates();
    this.currentCoordinates = coords;
    new Promise((resolve) => setTimeout(resolve, 500))
    .then(() => {
      return GoogleMap.create({
        id: 'map',
        element: this.mapRef.nativeElement,
        apiKey: environment.mapsApiKey,
        config: {
          center: {
            lat: coords.latitude,
            lng: coords.longitude
          },
          zoom: 17,
          clickableIcons: false,
          disableDefaultUI: true,
          keyboardShortcuts: false,
          gestureHandling: "greedy"
        },
        language: 'es'
      });
    })
    .then((map) => {
      this.newMap = map;

      this.addMarker(coords);
    });
  }

  ngOnDestroy(): void {
    this.newMap.destroy();
  }

  private removeMarker(coordinates: ICoordinate, markerId: string): void {
    this.newMap.removeMarker(markerId);
    this.addMarker(coordinates);
  }

  private async addMarker(coordinates: ICoordinate): Promise<void> {
    const markerId = await this.newMap.addMarker({
      coordinate: {
        lat: coordinates.latitude,
        lng: coordinates.longitude
      },
      iconUrl: this.markerImage,
      draggable: true
    });
    this.sharedDataService.setCurrentMarkerId(markerId);

    await this.newMap.setOnMapClickListener((event) => {
      const newCoords = {latitude: event.latitude, longitude: event.longitude};
      this.removeMarker(newCoords, markerId);
    });
  }

  public UpdateSearchResults(isCurrentAddress = false) {
    const input = isCurrentAddress ? this.autocompleteCurrent.input : this.autocompleteDestination.input;
    const addressesArray = isCurrentAddress ? this.autocompleteCurrentAddresses : this.autocompleteDestinationAddresses;

    if (input === '') {
      addressesArray.length = 0;
      return;
    }

    this.GoogleAutocomplete.getPlacePredictions({ input: input + 'Tegucigalpa, Honduras' }, (predictions: any) => {
      addressesArray.length = 0;
      this.zone.run(() => {
        addressesArray.push(...predictions);
      });
    });
  }

  public SelectSearchResult(item: any, isCurrentAddress = false): void {
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };
    this.nativeGeocoder.forwardGeocode(item.description, options).then((coords : NativeGeocoderResult[]) => {
      const coordinates = {latitude: +coords[0].latitude, longitude: +coords[0].longitude};
      const cameraOptions = {
        coordinate: {
          lat: coordinates.latitude,
          lng: coordinates.longitude
        },
        zoom: 17,
        animate: true
      };

      if (isCurrentAddress) {
        this.currentCoordinates = coordinates;
        const markerId = this.sharedDataService.getCurrentMarkerId();
        this.removeMarker(coordinates, markerId);
        this.autocompleteCurrent.input = item.description;
        this.autocompleteCurrentAddresses = [];
      } else {
        const centeredCoordinates = calculateMidpoint(coordinates, this.currentCoordinates);
        this.addMarker(coordinates);
        cameraOptions.coordinate = {
          lat: centeredCoordinates.latitude,
          lng: centeredCoordinates.longitude
        };
        cameraOptions.zoom = 13;
        this.autocompleteDestination.input = item.description;
        this.autocompleteDestinationAddresses = [];
      }
      this.newMap.setCamera(cameraOptions);
    });
  }

  public ClearAutocomplete(isCurrentAddress = false): void {
    if (isCurrentAddress) {
      this.autocompleteCurrentAddresses = [];
      this.autocompleteCurrent.input = '';
    } else {
      this.autocompleteDestinationAddresses = [];
      this.autocompleteDestination.input = '';
    }
  }
}

