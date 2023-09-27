import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
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
  public GoogleAutocomplete: google.maps.places.AutocompleteService;
  public directionsRenderer: google.maps.DirectionsRenderer;
  public directionsService: google.maps.DirectionsService;
  public loading = true;
  private currentCoordinates = {lat: 0, lng: 0};
  private markerImage = MARKER_IMAGE;
  private startPlaceCoords = {lat: 0, lng: 0};
  private destinationCoords = {lat:0, lng:0};
  private emptyCoords = {lat:0, lng:0};
  @ViewChild('map', { static: true })
  mapRef!: ElementRef;
  newMap!: any;

  constructor(
    private sharedDataService: SharedDataService,
    private nativeGeocoder: NativeGeocoder,
    private zone: NgZone
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({polylineOptions: {strokeColor: '#00E741'}, suppressMarkers: true});
  }

  ngOnInit() {
    const coords = this.sharedDataService.getCoordinates();
    this.currentCoordinates = coords;
    const mapOptions = {
      mapId: 'f8e6a2472dfc90b0',
      center: coords,
      zoom: 17,
      clickableIcons: false,
      disableDefaultUI: true,
      keyboardShortcuts: false,
      gestureHandling: 'greedy'
    };
    setTimeout(() => {
      this.newMap = new google.maps.Map(this.mapRef.nativeElement, mapOptions);

      this.directionsRenderer.setMap(this.newMap);
      this.sharedDataService.setCurrentMarker(this.addMarker(coords));
    }, 500);
    setTimeout(() => this.loading = false , 2000)
  }

  ngOnDestroy(): void {
    if (this.newMap) {
      google.maps.event.clearInstanceListeners(this.newMap);
      this.newMap = null;
    }
  }

  private removeMarker(marker: google.maps.Marker): void {
    marker.setMap(null);
  }

  private addMarker(coordinates: ICoordinate): google.maps.Marker {
    const marker = new google.maps.Marker({
      position: coordinates,
      map: this.newMap,
      draggable: true,
      icon: {
        url: this.markerImage,
        scaledSize: new google.maps.Size(50, 50)
      }
    });
    return marker;
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
      const coordinates = {lat: +coords[0].latitude, lng: +coords[0].longitude};
      const cameraOptions = {
        coordinate: coordinates,
        zoom: 14
      };

      if (isCurrentAddress) {
        this.currentCoordinates = coordinates;
        const marker = this.sharedDataService.getCurrentMarker();
        this.removeMarker(marker);
        this.startPlaceCoords = coordinates;
        this.sharedDataService.setCurrentMarker(this.addMarker(coordinates));
        this.autocompleteCurrent.input = item.description;
        this.autocompleteCurrentAddresses = [];
      } else {
        const centeredCoordinates = calculateMidpoint(coordinates, this.currentCoordinates);
        const marker = this.sharedDataService.getDestinationMarker();
        this.destinationCoords = coordinates;
        this.removeMarker(marker);
        this.sharedDataService.setDestinationMarker(this.addMarker(coordinates));
        cameraOptions.coordinate = centeredCoordinates;
        cameraOptions.zoom = 13;
        this.autocompleteDestination.input = item.description;
        this.autocompleteDestinationAddresses = [];
      }
      this.newMap.setZoom(cameraOptions.zoom);
      this.newMap.panTo(cameraOptions.coordinate);
      if (this.startPlaceCoords !== this.emptyCoords && this.destinationCoords !== this.emptyCoords) {
        this.calcRoute(this.startPlaceCoords, this.destinationCoords);
      }
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

  private calcRoute(start: ICoordinate, end: ICoordinate) {
    const request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode['DRIVING']
    };
    this.directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        this.directionsRenderer.setDirections(result);
      }
    });
  }
}

