import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from 'src/app/core/services';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { ICoordinate } from 'src/app/core/interfaces';
import { Router } from '@angular/router';
import { AddressMutations } from '../../services';
import { IAddress } from '../../interfaces';

const ICON_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/plus.png';
const LOGO_URL = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/atlantis-logo-white.png';
const MARKER_IMAGE = 'https://biiz-bucket.s3.us-east-2.amazonaws.com/marker.png';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit, OnDestroy {
  public addresses: IAddress[] = [];
  public iconUrl = ICON_URL;
  public logoUrl = LOGO_URL;
  private markerImage = MARKER_IMAGE;
  public autocompleteAddresses: any = [];
  public autocomplete = { input: ''};
  public GoogleAutocomplete: google.maps.places.AutocompleteService;
  public directionsService: google.maps.DirectionsService;
  public weatherImage = '';
  public temperature = 0;
  public addressName = '';
  public newMap!: any;
  @ViewChild('map', { static: true })
  mapRef!: ElementRef;

  constructor(
    private sharedDataService: SharedDataService,
    private _addressMutation: AddressMutations,
    private nativeGeocoder: NativeGeocoder,
    private zone: NgZone,
    private _router: Router
  ){
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.directionsService = new google.maps.DirectionsService();
  }

  ngOnInit(): void {
    const coords = this.sharedDataService.getCoordinates();
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
      this.sharedDataService.setCurrentMarker(this.addMarker(coords));
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.newMap) {
      google.maps.event.clearInstanceListeners(this.newMap);
      this.newMap = null;
    }
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

  public UpdateSearchResults() {
    const input = this.autocomplete.input;

    if ( input=== '') {
      this.autocompleteAddresses = [];
      return;
    }

    this.GoogleAutocomplete.getPlacePredictions({ input: input + 'Tegucigalpa, Honduras' }, (predictions: any) => {
      this.autocompleteAddresses = [];
      this.zone.run(() => {
        this.autocompleteAddresses.push(...predictions);
      });
    });
  }

  public SelectSearchResult(item: any): void {
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };
    this.nativeGeocoder.forwardGeocode(item.description, options).then((coords : NativeGeocoderResult[]) => {
      const coordinates = {lat: +coords[0].latitude, lng: +coords[0].longitude};
      const cameraOptions = {
        coordinate: coordinates,
        zoom: 17
      };

      const marker = this.sharedDataService.getCurrentMarker();
      this.removeMarker(marker);
      this.sharedDataService.setCurrentMarker(this.addMarker(coordinates));
      this.autocomplete.input = item.description;
      this.autocompleteAddresses = [];
      this.newMap.setZoom(cameraOptions.zoom);
      this.newMap.panTo(cameraOptions.coordinate);
    });
  }

  public ClearAutocomplete(): boolean {
    this.autocompleteAddresses = [];
    this.autocomplete.input = '';

    return true;
  }

  public async saveAddress(): Promise<void> {
    const marker = this.sharedDataService.getCurrentMarker().getPosition();
    const latitude = marker?.lat() || 0;
    const longitude = marker?.lng() || 0;
    const address: IAddress = {
      name: this.addressName,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      primary: false,
      address: this.autocomplete.input
    };

    const mutationRespone = await this._addressMutation.createAddress(address);

    if (mutationRespone) {
      this._router.navigate(['/passenger/address']);
    }
  }

  private removeMarker(marker: google.maps.Marker): void {
    marker.setMap(null);
  }
}
